from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from dotenv import load_dotenv

load_dotenv()
uri = os.environ.get('Mongo_URI')  # accessing uri from .env variable


# Create a new client and connect to the server
cluster = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    cluster.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

# Create or use database MEDVault.
db = cluster.MEDVault
# Use or create collection clients.
users = db.clients
