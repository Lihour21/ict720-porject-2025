import paho.mqtt.client as mqtt
import json
import os

from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get MQTT broker settings from environment variables
mqtt_broker = os.getenv("MQTT_BROKER")
mqtt_port = int(os.getenv("MQTT_PORT"))
mqtt_topic = os.getenv("MQTT_TOPIC")

# MongoDB URI (from Atlas)
mongo_uri = os.getenv("MONGO_URI")

# Connect to MongoDB
client = MongoClient(mongo_uri)
db = client.get_database('meow')  # Default database (use .get_database('your_db') to specify)
collection = db["distance_data"]  # Define the collection name

# Define the MQTT callbacks
def on_connect(client, userdata, flags, rc):
    print(f"Connected to MQTT broker with result code: {rc}")
    client.subscribe(mqtt_topic)

# Callback when message is received
def on_message(client, userdata, msg):
    print("Message received on topic {}: {}".format(msg.topic, msg.payload))
    
    # Parse the received message (assuming it's in JSON format)
    try:
        data = json.loads(msg.payload)
        print("Parsed Data: Station: {}, Distance: {}, D_max: {}".format(data["station"], data["distance"], data["d_max"]))
    except json.JSONDecodeError as e:
        print(f"Failed to decode JSON: {e}")

    # Insert the data into MongoDB
    collection.insert_one(data)
    print(f"Data inserted into MongoDB: {data}")

# Create MQTT client and set up callbacks
client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
client.on_message = on_message

# Connect to the MQTT broker
client.connect(mqtt_broker, mqtt_port, 60)

# Subscribe to the desired topic
client.subscribe(mqtt_topic)

# Loop forever, waiting for messages
client.loop_forever()