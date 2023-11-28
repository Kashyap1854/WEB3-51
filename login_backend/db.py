from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://VIki:6mzMzlfuccCRi8kl@medvault.n0buiny.mongodb.net/?retryWrites=true&w=majority"


# Create a new client and connect to the server
cluster = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    cluster.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

# Use database.
db = cluster.MEDVault
# Use collection
users = db.clients
