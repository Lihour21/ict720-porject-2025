from flask import Flask, request, jsonify
from pymongo import MongoClient
from datetime import datetime, timedelta
import os
import sys

# Initialize Flask app
app = Flask(__name__)

# Load environment variables
MONGO_URI = os.getenv('MONGO_URI')
MONGO_DB = os.getenv('MONGO_DB')
MONGO_COL_DEVICE = os.getenv('MONGO_COL_DEV')
MONGO_COL_USER = os.getenv('MONGO_COL_USER')

# Validate environment variables
if not all([MONGO_URI, MONGO_DB, MONGO_COL_DEVICE, MONGO_COL_USER]):
    print('Error: All MongoDB environment variables (MONGO_URI, MONGO_DB, MONGO_COL_DEV, MONGO_COL_USER) are required')
    sys.exit(1)

# Initialize MongoDB connection
mongo_client = MongoClient(MONGO_URI)
print(f"MongoDB connected: {MONGO_URI}")

@app.route('/api/station/<station_id>', methods=['GET'])
def query_station(station_id):
    """Query station data based on station ID and parameters."""
    response = {}
    
    if not station_id:
        response.update({
            'status': 'error',
            'message': 'station_id is required'
        })
        return jsonify(response)

    # Get query parameters with defaults
    rssi_threshold = int(request.args.get('rssi', -100))
    minutes_ago = int(request.args.get('mins', 10))
    
    # Database query
    db = mongo_client[MONGO_DB]
    device_collection = db[MONGO_COL_DEVICE]
    
    # Filter for the last 2 hours as per new requirement
    time_threshold = datetime.now() - timedelta(hours=2)  # Updated to 2 hours
    query = {
        "station": station_id,
        "timestamp": {"$gt": time_threshold},
        "rssi": {"$gt": rssi_threshold}
    }
    
    # Fetch and sort documents
    documents = device_collection.find(query).sort("timestamp", -1)
    
    # Process results
    response.update({
        'status': 'ok',
        'station': station_id,
        'data': []
    })
    
    # Process each record as per the new logic
    for record in documents:
        record_data = {
            'timestamp': record['timestamp'].isoformat(),
            'device': record['device'],
            'rssi': record['rssi']
        }
        response['data'].append(record_data)
    
    # Handle empty results
    if not response['data']:
        return jsonify({
            'status': 'error',
            'text': 'no station data'
        })
    
    return jsonify(response)

@app.route('/api/asset/<asset_id>', methods=['GET'])
def query_asset(asset_id):
    """Query asset data based on asset ID and parameters."""
    response = {}
    
    if not asset_id:
        response.update({
            'status': 'error',
            'message': 'asset_id is required'
        })
        return jsonify(response)
    
    # Get query parameters with defaults
    rssi_threshold = int(request.args.get('rssi', -60))
    minutes_ago = int(request.args.get('mins', 60))
    
    # Database query
    db = mongo_client[MONGO_DB]
    device_collection = db[MONGO_COL_DEVICE]
    
    time_threshold = datetime.now() - timedelta(minutes=minutes_ago)
    query = {
        "device": asset_id,
        "timestamp": {"$gt": time_threshold},
        "rssi": {"$gt": rssi_threshold}
    }
    
    # Fetch and sort documents
    documents = device_collection.find(query).sort("timestamp", -1)
    
    # Process results
    response.update({
        'status': 'ok',
        'asset': asset_id,
        'data': []
    })
    
    for doc in documents:
        response['data'].append({
            'timestamp': doc['timestamp'].isoformat(),
            'station': doc['station'],
            'rssi': doc['rssi']
        })
    
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)