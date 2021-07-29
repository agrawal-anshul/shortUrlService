import string
from flask import Flask, jsonify, request, PyMongo, render_template
import hashlib
import string
import random
from datetime import datetime

URL_LENGTH = 7
app = Flask(__name__)

mongodb_client = PyMongo(app, uri="mongodb://10.186.68.39:27017/shorturl")
db = mongodb_client.db

@app.route('/')
def session():
	return render_template('index.html')

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

if __name__ == '__main__':
	app.run(debug=True)