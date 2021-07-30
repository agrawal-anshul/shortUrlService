import json
from enum import unique
import string
import requests
from flask import Flask, jsonify, request, render_template, redirect, Response
from flask_cors import CORS, cross_origin
import hashlib
import string
import random
import pymongo
import json
import validators
from bson import json_util
from datetime import datetime
import dateutil.parser as parser

URL_LENGTH = 7
app = Flask(__name__)

mongodb_client = pymongo.MongoClient("mongodb://10.186.68.39:27017")
db = mongodb_client["shorturl"]

@app.route('/')
def session():
	return "shortUrlSystem APIs say Hello!"

@app.route('/create', methods=['POST', 'GET'])
@cross_origin(allow_headers=['Content-Type'])
def create():
    req = request.data
    req = json.loads(req)
    uid = req['uid']
    custom_alias = req['custom_alias']
    original_url =req['original_url']
    exp_date = parser.parse(req['exp_date'])
    print(exp_date.isoformat())

    creation_date = datetime.now()

    if custom_alias :
        # custom_alis is used as short url only if it's not a duplicate
        dup = db.urls.find_one({"short_url": custom_alias})
        if dup:
            return jsonify("Custom alias is already existing")
        else:
            data = db.urls.find_one({'original_url' : original_url, 'user_id' : uid})
            if data :
                db.urls.update_one({'_id': data["_id"]}, {"$set": {'short_url': custom_alias}})
            else:
                db.urls.insert_one({'short_url': custom_alias, 'original_url': original_url, 'creation_date' : creation_date, 'expiration_date' : exp_date, 'user_id' : uid})
            return jsonify(custom_alias)       
    else:
        # apply hasing and create a unique short_url
        data = db.urls.find_one({'original_url' : original_url, 'user_id' : uid})
        if data :
            return jsonify(data['short_url'])

        hash_val = hashlib.md5(original_url.encode('utf-8')).hexdigest()
        short_url = ''.join((random.choice(hash_val) for _ in range(URL_LENGTH)))
        while (True):
            dup = db.urls.find_one({"short_url": short_url})
            if dup:
                short_url = ''.join((random.choice(hash_val) for _ in range(URL_LENGTH)))
            else:
                break
        db.urls.insert_one({'short_url': short_url, 'original_url': original_url, 'creation_date' : creation_date, 'expiration_date' : exp_date, 'user_id' : uid})
        return jsonify(short_url) 

@app.route('/fetch', methods=["GET"])
@cross_origin(allow_headers=['Content-Type'])
def fetch():
    uid = request.args.get('uid')
    data = list(db.urls.find({'user_id' : uid}))
    for d in data:
        if d['expiration_date'] and d['expiration_date'] <= datetime.now():
            db.urls.delete_one({'short_url' : d['short_url']})
    data = db.urls.find({'user_id' : uid})
    return Response(json_util.dumps(data))

@app.route('/delete', methods=["GET"])
@cross_origin(allow_headers=['Content-Type'])
def delete():
    short_url = request.args.get('short_url')
    db.urls.delete_one({'short_url' : short_url})

@app.route("/login", methods=["GET"])
@cross_origin(allow_headers=['Content-Type'])
def login():
    response = {}
    user = request.args.get("username", None)    
    if user:
        response = requests.get("http://wdc-prd-nimbus-api.eng.vmware.com/api/v1/users/{}".format(user))
        data=response.json()
        if response.status_code==200:
            # check if the user is already present in db
            existing_user= db.users.find_one({"user_id": user})
            if existing_user:
                #if present then update the last login
                db.users.update_one({"user_id":existing_user['user_id']},{"$set":{"last_login":datetime.now()}})
            else:
                #if not exists, insert the new user
                db.users.insert_one({'user_id':user,'email':user+"@vmware.com",'creation_ts':datetime.now(),'last_login':datetime.now()})

            return {"status_code":response.status_code, "data":data }
        else:
            return {"status_code":response.status_code, "data":data}        
    return {"status_code":-1, "message":"username param missing"}

@app.route('/<short_url>')
@cross_origin(allow_headers=['Content-Type'])
def redirecturl(short_url):
    # short_url = request.args.get('short_url')
    data = db.urls.find_one({'short_url' : short_url})
    redirect_path = data['original_url']
    if not redirect_path:
        return jsonify("Url not specified")
    else:
        if validators.url(redirect_path) :
            return redirect(redirect_path, code=302)
        else:
            return jsonify("Invalid url")

if __name__ == '__main__':
	app.run(host="localhost", port=8000, debug=True)
	# app.run(host="0.0.0.0", port=8000, debug=True)