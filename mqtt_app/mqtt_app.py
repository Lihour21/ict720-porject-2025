import paho.mqtt.client as mqtt
import json
import os
import time
import threading

from datetime import datetime
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError, PyMongoError
from dotenv import load_dotenv

# Init variable
D = 200

# Define the dictionary for floor and room mapping
floor_room_dict = {
    'device01': {'floor': 'floor1', 'room': 'room1'},
    'device02': {'floor': 'floor2', 'room': 'room2'},
}

# Load environment variables from .env file
load_dotenv()

# Get MQTT broker settings from environment variables
MQTT_BROKER = os.getenv("MQTT_BROKER")
MQTT_PORT = int(os.getenv("MQTT_PORT"))
MQTT_TOPIC = os.getenv("MQTT_TOPIC")
CALL_TOPIC = os.getenv("CALL_TOPIC")

# MongoDB URI (from Atlas)
MONGO_URI = os.getenv("MONGO_URI")

# Connect to MongoDB with error handling
try:
    mongo_client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)  # 5s timeout
    db = mongo_client["Cluster0"]  # Use database named "meow"
    collection = db["distance_data"]  # Collection to store MQTT messages
    print("Connected to MongoDB Atlas successfully!")
except ServerSelectionTimeoutError:
    print("Failed to connect to MongoDB Atlas. Check your connection settings.")
    exit(1)

# Define the MQTT callbacks
def on_connect(mqtt_client, userdata, flags, rc):
    print(f"Connected to MQTT broker with result code: {rc}")
    mqtt_client.subscribe(MQTT_TOPIC)

# Callback when message is received
def on_message(mqtt_client, userdata, msg):
    print("Message received on topic {}: {}".format(msg.topic, msg.payload))
    data = json.loads(msg.payload.decode("utf-8"))
    p_remain = 100 - ((data['distance'] - data['d_max']) / (D - data['d_max']) * 100)
    
    if p_remain > 100:
        p_remain = 100
    elif p_remain < 0:
        p_remain = 0

    station = data.get("station", "")
    floor_room = floor_room_dict[station]

    data_send = {}
    data_send['timestamp'] = datetime.now().isoformat()
    data_send['floor'] = floor_room['floor']
    data_send['room'] = floor_room['room']
    data_send['tsi'] = p_remain # Tissue Strength Indicator
    data_send['rst'] = data['rst']

    print(data_send)

    # Here you can insert the data into MongoDB if required:
    try:
        result = collection.insert_one(data_send)
        print(f"Data inserted into MongoDB with ID: {result.inserted_id}")
    except PyMongoError as e:
        print(f"Error inserting data into MongoDB: {e}")

# Function to publish a "call" message every 5 seconds
def send_call(mqtt_client):
    last_sent_time = None  # Variable to keep track of the last time a message was sent
    
    # while True:
    #     # Get the current time
    #     now = datetime.now()

    #     # Check if the current minute is 00 and if we haven't already sent a message in this minute
    #     if (now.minute % 20) == 0 and 6 <= now.hour < 18 and (last_sent_time is None or last_sent_time != now.minute):
    #         # Construct the "call" message (it could be a simple string or JSON data)
    #         call_message = json.dumps({"message": "call", "timestamp": now.isoformat()})
    #         # Publish to the CALL_TOPIC
    #         mqtt_client.publish(CALL_TOPIC, call_message)
    #         print(f"Published 'call' to {CALL_TOPIC} at {now.isoformat()}")
    #         # Update the last sent time to avoid sending more than once per minute
    #         last_sent_time = now.minute

    #     # You can use a small delay to prevent overloading the CPU
    #     time.sleep(25)

    while True:
        # Get the current time
        now = datetime.now()

        call_message = json.dumps({"message": "call", "timestamp": now.isoformat()})
        # Publish to the CALL_TOPIC
        mqtt_client.publish(CALL_TOPIC, call_message)
        print(f"Published 'call' to {CALL_TOPIC} at {now.isoformat()}")

        time.sleep(3)

# Create MQTT client and set up callbacks
mqtt_client = mqtt.Client()
mqtt_client.on_connect = on_connect
mqtt_client.on_message = on_message

# Connect to the MQTT broker
mqtt_client.connect(MQTT_BROKER, MQTT_PORT)

# Start the MQTT client loop in a separate thread
mqtt_thread = threading.Thread(target=mqtt_client.loop_forever)
mqtt_thread.start()

# Start sending "calls" on a different topic every 5 seconds
send_call(mqtt_client)