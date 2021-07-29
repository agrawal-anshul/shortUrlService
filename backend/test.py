# test database connection:
import pymongo
client = pymongo.MongoClient("mongodb://10.186.68.39:27017/")
print(client.list_database_names())
db = client["shorturl"]
print(db.list_collection_names())
# OR
# import pymongo import MongoClient
# client = MongoClient('10.186.68.39', 27017)
# print(client.list_database_names())