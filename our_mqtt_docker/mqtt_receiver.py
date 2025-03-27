import paho.mqtt.client as mqtt
import json
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get MQTT broker settings from environment variables
broker = os.getenv("BROKER")  # MQTT Broker address
port = int(os.getenv("PORT"))  # MQTT Broker port (ensure it's an integer)
topic = os.getenv("TOPIC")  # MQTT topic

# Callback when message is received
def on_message(client, userdata, msg):
    print("Message received on topic {}: {}".format(msg.topic, msg.payload))
    
    # Parse the received message (assuming it's in JSON format)
    try:
        data = json.loads(msg.payload)
        print("Parsed Data: Station: {}, Distance: {}".format(data["station"], data["distance"]))
    except json.JSONDecodeError as e:
        print(f"Failed to decode JSON: {e}")

# Create MQTT client and set up callbacks
client = mqtt.Client()
client.on_message = on_message

# Connect to the MQTT broker
client.connect(broker, port, 60)

# Subscribe to the desired topic
client.subscribe(topic)

# Loop forever, waiting for messages
client.loop_forever()