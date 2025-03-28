import os
import sys
import pymongo

from flask import Flask, request, jsonify
from pymongo import MongoClient
from datetime import datetime

# Initialize Flask app
app = Flask(__name__)

# Load environment variables
MONGO_URI = os.getenv('MONGO_URI')
MONGO_DB = os.getenv('MONGO_DB')
MONGO_COL = os.getenv('MONGO_COL')  # Collection for toilet paper data

# Validate environment variables
if not all([MONGO_URI, MONGO_DB, MONGO_COL]):
    print('Error: All MongoDB environment variables (MONGO_URI, MONGO_DB, MONGO_COL) are required')
    sys.exit(1)

# Initialize MongoDB connection
mongo_client = MongoClient(MONGO_URI)
print(f"MongoDB connected: {MONGO_URI}")

# Create an index for efficient querying by floor and room
db = mongo_client[MONGO_DB]
device_collection = db[MONGO_COL]
device_collection.create_index([("floor", pymongo.ASCENDING), ("room", pymongo.ASCENDING)])

# Verify connection by printing the count of documents in the collection
print(f"Number of documents in {MONGO_DB}.{MONGO_COL}: {device_collection.count_documents({})}")

# Optionally, print a sample document to verify structure
sample_document = device_collection.find_one()
if sample_document:
    print(f"Sample document: {sample_document}")

@app.route('/toiletpaper/<floor>/<room>', methods=['GET'])
def query_toiletpaper(floor, room):
    """Query data for a specific floor and room."""
    response = {}

    # Database query
    query = {
        "floor": floor,
        "room": room
    }

    # Fetch and sort documents
    documents = device_collection.find(query).sort("timestamp", -1)

    response.update({
        'status': 'ok',
        'floor': floor,
        'room': room,
        'data': []
    })

    for record in documents:
        # Handle 'timestamp' correctly, converting it to ISO format if needed
        timestamp = record['timestamp']
        if isinstance(timestamp, str):  # If it's a string, convert it to datetime
            timestamp = datetime.fromisoformat(timestamp)
        elif isinstance(timestamp, datetime):  # If it's already a datetime object
            timestamp = timestamp

        # Add data to response
        record_data = {
            'timestamp': timestamp.isoformat(),
            'tsi': record.get('tsi'),
            'rst': record.get('rst')
        }
        response['data'].append(record_data)

    # Handle empty results
    if not response['data']:
        return jsonify({
            'status': 'error',
            'text': 'no data for this floor/room'
        })

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
