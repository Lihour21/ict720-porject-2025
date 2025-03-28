#include <M5Stack.h>
#include <Wire.h>
#include <Adafruit_VL53L0X.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

// ~~~~~~~~~ VARIABLES BEGIN ~~~~~~~~~
// Wifi
const char* ssid = "Navik_69420";          // Replace with your Wi-Fi network name
const char* password = "SMTXRAIGEN1";  // Replace with your Wi-Fi password

// MQTT
const char* mqtt_server = "192.168.137.1"; // Your MQTT broker address
const int mqtt_port = 1883; // MQTT port, typically 1883 for unencrypted connection
const char* mqtt_user = ""; // MQTT username (if required)
const char* mqtt_password = ""; // MQTT password (if required)
const char* mqtt_topic = "m5stack/distance"; // Topic to send the distance
const char* mqtt_call_topic = "m5stack/call"; // Topic to receive the "call" message

// Distance
uint16_t distance = 0;  // Current distance reading from the sensor
uint16_t d_max = 30;  // Default d_max value

// Button debounce variables
unsigned long lastButtonPress = 0;   // Time of last button press
const unsigned long debounceDelay = 500; // Minimum delay between button presses (in ms)

// MQTT Flags
bool mqttCallReceived = false; // Flag to track if a "call" message is received
// ~~~~~~~~~ VARIABLES END ~~~~~~~~~

// ~~~~~~~~~ INIT BEGIN ~~~~~~~~~
Adafruit_VL53L0X lox;
WiFiClient espClient;
PubSubClient client(espClient);
// ~~~~~~~~~ INIT END ~~~~~~~~~

// ~~~~~~~~~ FORWARD DECLARATION BEGIN ~~~~~~~~~
void reconnectMQTT();
void updateDMax();
uint16_t calculateAverage(uint16_t readings[]);

void callback(char* topic, byte* payload, unsigned int length) {
  // Handle incoming MQTT messages
  if (strcmp(topic, mqtt_call_topic) == 0) {
    mqttCallReceived = true; // Set flag if "call" message is received
    Serial.println("Call message received!");
  }
}
// ~~~~~~~~~ FORWARD DECLARATION END ~~~~~~~~~

void setup() {
  // ~~~~~~~~~ VOID SETUP STUFF BEGIN ~~~~~~~~~
  M5.begin();
  Serial.begin(115200);
  delay(1000);

  pinMode(39, INPUT);
  // ~~~~~~~~~ VOID SETUP STUFF END ~~~~~~~~~

  // ~~~~~~~~~ SENSOR STUFF BEGIN ~~~~~~~~~
  // Initialize the VL53L0X sensor
  if (!lox.begin()) {
    Serial.println("Failed to initialize VL53L0X sensor!");
    while (1);
  }
  Serial.println("VL53L0X sensor initialized.");
  // ~~~~~~~~~ SENSOR STUFF END ~~~~~~~~~

  // ~~~~~~~~~ WIFI STUFF BEGIN ~~~~~~~~~
  // Connect to Wi-Fi
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);

  // Wait for the connection to succeed
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  // Print the IP address
  Serial.println();
  Serial.print("Connected to Wi-Fi, IP address: ");
  Serial.println(WiFi.localIP());
  // ~~~~~~~~~ WIFI STUFF END ~~~~~~~~~

  // ~~~~~~~~~ MQTT STUFF BEGIN ~~~~~~~~~
  // Connect to MQTT
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback); // Register the callback function to handle incoming messages
  while (!client.connected()) {
    Serial.print("Connecting to MQTT...");
    if (client.connect("M5StackAtom", mqtt_user, mqtt_password)) {
      Serial.println("Connected to MQTT broker");
      client.subscribe(mqtt_call_topic); // Subscribe to the "call" topic
    } else {
      Serial.print("Failed, rc=");
      Serial.print(client.state());
      Serial.println(" trying again in 5 seconds");
      delay(5000);
    }
  }
  // ~~~~~~~~~ MQTT STUFF END ~~~~~~~~~
}

void loop() {
  // ~~~~~~~~~ CONNECT MQTT BEGIN ~~~~~~~~~
  // Ensure MQTT connection is active
  if (!client.connected()) {
    reconnectMQTT();
  }
  client.loop(); // Handle incoming MQTT messages
  // ~~~~~~~~~ CONNECT MQTT END ~~~~~~~~~

  // ~~~~~~~~~ RESET D_MAX BEGIN ~~~~~~~~~
  // Wait until the button is pressed
  bool buttonPressed = (digitalRead(39) == LOW); // Active LOW: 0 when pressed

  if (buttonPressed) {
    Serial.println("Button Pressed!");
    updateDMax();  // Update d_max value when the button is pressed

    // Wait for the button to be released before continuing
    while (digitalRead(39) == LOW) {
      delay(10);  // Small delay to avoid rapid looping
    }
    Serial.println("Button Released!");
  }
  // ~~~~~~~~~ RESET D_MAX END ~~~~~~~~~

  // Only send data if a condition is met (button pressed or call received)
  if (buttonPressed || mqttCallReceived) {
    // Read distance from VL53L0X
    distance = lox.readRange();

    // Check if there was a timeout
    if (lox.timeoutOccurred()) {
      Serial.println("Timeout occurred!");
    } else {
      // Create a DynamicJsonDocument
      DynamicJsonDocument doc(200);  // Allocate up to 200 bytes of memory dynamically
      doc["station"] = "device01";
      doc["distance"] = distance;
      doc["d_max"] = d_max;

      // Add the rst field to the JSON document
      if (buttonPressed) {
        doc["rst"] = 1;  // If the button is pressed, rst is 1
      } else {
        doc["rst"] = 0;  // Otherwise, rst is 0
      }

      // Serialize JSON to a string
      char jsonStr[200];
      serializeJson(doc, jsonStr);

      // Publish the JSON data to MQTT
      client.publish(mqtt_topic, jsonStr);

      // Print the JSON data to serial monitor
      Serial.print("Sent JSON: ");
      Serial.println(jsonStr);
    }

    // Reset flags after sending data
    mqttCallReceived = false;  // Reset the MQTT call flag
  }
  delay(1000); // Delay between readings
}

void reconnectMQTT() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("M5StackAtom", mqtt_user, mqtt_password)) {
      Serial.println("connected");
      client.subscribe(mqtt_call_topic);  // Resubscribe to the topic if connection is lost
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void updateDMax() {
  // Update the d_max value with the average of the next 3 distance readings
  uint16_t newReadings[3];

  for (int i = 0; i < 3; i++) {
    newReadings[i] = lox.readRange();
    delay(100);  // Short delay between readings
  }

  // Calculate the average of the 3 readings
  d_max = calculateAverage(newReadings);

  // Print the updated d_max value
  Serial.print("New d_max: ");
  Serial.println(d_max);
}

uint16_t calculateAverage(uint16_t readings[]) {
  // Calculate the average of the given readings
  uint16_t sum = 0.0;
  for (int i = 0; i < 3; i++) {
    sum += readings[i];
  }
  return sum / 3.0;
}