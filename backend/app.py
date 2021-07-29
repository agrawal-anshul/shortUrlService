import string
import requests
from flask import Flask, jsonify,request,render_template
from flask_cors import CORS, cross_origin
import hashlib
import string
import random
import pymongo
from datetime import datetime

URL_LENGTH = 7
app = Flask(__name__)

mongodb_client = pymongo.MongoClient("mongodb://10.186.68.39:27017")
db = mongodb_client["shorturl"]

@app.route('/')
def session():
	return "shortUrlSystem APIs say Hello!"

@app.route('/create', methods=['POST','GET'])
def create():
    if request.method == 'POST':
        uid = request.form.get['uid']
        email = request.form.get['email']
        custom_alias = request.form.get['custom_alias']
        original_url = request.form.get['original_url']
        exp_date = request.form.get['exp_date']
        creation_date = datetime.now()

        db.users.insert_one({'user_id': uid, 'email': email})

        if custom_alias :
            # custom_alis is used as short url only if it's not a duplicate
            dup = db.urls.find_one({"short_url": custom_alias})
            if dup:
                return jsonify("Custom alias is already existing")
            else:
                db.urls.insert_one({'short_url': custom_alias, 'original_url': original_url, 'creation_date' : creation_date, 'expiration_date' : exp_date, 'user_id' : uid})
                return jsonify(custom_alias)       
        else:
            # apply hasing and create a unique short_url
            hash_val = hashlib.md5(original_url.encode('utf-8')).hexdigest()
            short_url = ''.join((random.choice(hash_val) for _ in range(URL_LENGTH)))
            while (True):
                dup = db.urls.find_one({"short_url": short_url})
                if dup:
                    short_url = ''.join((random.choice(hash) for _ in range(URL_LENGTH)))
                    break
            db.urls.insert_one({'short_url': short_url, 'original_url': original_url, 'creation_date' : creation_date, 'expiration_date' : exp_date, 'user_id' : uid})
            return jsonify(short_url) 

@app.route('/redirect')
def redirect():
    short_url = request.form.get('short_url')
    alias = short_url[-URL_LENGTH]
    redirect_path = db.urls.find_one({'short_url' : alias})
    if not redirect_path:
        return render_template('404.html')
    else:
        return render_template('redirect.html', redirect_path = redirect_path['original_url'])

@app.route('/fetch')
def fetch():
    uid = request.form.get('uid')
    data = db.user.find_one({'user_id' : uid})
    if data['expiration_date'] >= datetime.now():
        delete(data['short_url'])
        return None
    return data


@app.route('/delete')
def delete():
    short_url = request.form.get('short_url')
    db.urls.deleteOne({'short_url' : short_url})

@app.route("/user_login", methods=["GET"])
@cross_origin(allow_headers=['Content-Type'])
def user_login():
    response = {}
    user = request.args.get("user", None)
    if user:
        response = requests.get("http://wdc-prd-nimbus-api.eng.vmware.com/api/v1/users/{}".format(user))
        print(response.status_code)
        return response.json()
    return response

if __name__ == '__main__':
	app.run(host="localhost", port=8000, debug=True)
	# app.run(host="0.0.0.0", port=8000, debug=True)