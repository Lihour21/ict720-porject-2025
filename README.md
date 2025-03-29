# Papyrus Group
## Overview
This project aims to develop an Internet of Things system designed to monitor the remaining toilet paper in restrooms, ensuring both users and cleaning staff are always aware of stock levels. The toilet paper monitoring system will use a VL53L0X Time-of-Flight sensor to measure the distance between the top of the toilet paper roll and the top of the holder. As the toilet paper is used, the distance between the sensor and the roll will decrease, providing real-time information about how much paper is left. The data will then be sent to an M5Stack Atom, where it will calculate the remaining paper on the roll and sends the information via Wi-Fi to a local server.

## User stories 
1. **US1**: Device Setup & Connectivity

As an owner, I want to register my toilet paper monitoring device with my home/business WiFi, so that I can receive data remotely.

*   **acceptance criteria #1**
I can input the WiFi SSID and password to connect the device.

*   **acceptance criteria #2**
I can verify that the device is online.

*   **acceptance criteria #3**
I receive a confirmation message when the device successfully connects to the server.

2. **US2**: Toilet Paper Level Detection

As an owner, I want my device to measure toilet paper levels, so that I know when I need to refill it.

*  **acceptance criteria #1**
The system detects and records the current level of toilet paper.

*  **acceptance criteria #2**
The system updates data in the IoT server/database via MQTT.

*  **acceptance criteria #3**
I can view the real-time toilet paper level on the web server.

3. **US3**: Low Toilet Paper Notification

As an owner, I want to receive a notification when toilet paper is running low, so that I can refill it before it runs out.

*  **acceptance criteria #1**
The system sends a notification when the toilet paper level is below a set threshold.

*  **acceptance criteria #2**
I receive an alert on my mobile app/web interface.

*  **acceptance criteria #3**
I can customize the threshold level for low-paper alerts.

4. **US4**: Refill Status Monitoring

As an owner, I want to mark when I have refilled the toilet paper, so that the system resets its tracking.

*  **acceptance criteria #1**
I can manually reset the toilet paper status in the web app.

*  **acceptance criteria #2**
The system automatically detects a refill and updates the status.

*  **acceptance criteria #3**
I receive a confirmation message when the refill is detected.


5. **US5**: Staff Notification for Refill

As a staff member responsible for maintenance, I want to receive a notification when the toilet paper is low, so that I know when to refill it.

*  **acceptance criteria #1**
The system sends a notification to designated staff when the toilet paper level is below a set threshold.

*  **acceptance criteria #2**
Staff can receive alerts via a mobile app, email, or other designated communication method.

*  **acceptance criteria #3**
The notification includes information about which dispenser needs refilling.

*  **acceptance criteria #4**
Staff can acknowledge or mark the notification as completed after refilling.

## Our UI protoype
<p align="center">
    <img src="https://github.com/Lihour21/toilet-paper-porject-2025/blob/f4a72ec34ff5a3f937a8a101e0013c7406ba7ddc/images/image-2.png">
</p>


## Project Diagram
<p align="center">
    <img src="https://github.com/user-attachments/assets/a1c14748-8bd7-4168-9f74-5edce146eb19">
</p>

# Data Design

### Data Collection

A sensor node will send out 3 information: The sensor ID, which corresponds to which cubicle the sensor is installed at; The sensor value/distance, will corresponds to the remaining toilet paper; Lastly is the time stamp used to collect and sent out the data periodically once every hour, from 6 am to 6 pm.

<p align="center">
    <img src="https://github.com/user-attachments/assets/1b0898e4-0c95-4998-af10-7bf51473d515">
</p>

**Measurement Equation**\
Let $D$ be the total distance, $x_{max}$ be the maximum height of the toilet paper roll, and $x$ be the distance to the current paper roll.

$$\text{Percentage Remaining} = 100 - \left[\frac{x - x_{max}}{D - x_{max}}\times100\right]$$

# Implementation
<p align="center">
    <img src="https://github.com/user-attachments/assets/2fe2e89e-8588-41a7-b678-dfa7203e8ee6">
</p>
<p align="center">
Flow of the entire project
</p>

### Hardware
The hardware consists of two components m5Stack Atom Matrix as the main board and the Time of Flight VL53L0X as the distance sensor. The hardware main function is to measure the raw distance from the top of the tissue box to the top of the toilet paper, then send that data, via mosquitto, to the mqtt_app. There are two conditions for the hardware to collect the data: First is that it receive the call from mqtt, and the second is when the button on m5Stack is pressed. When the button it pressed, the sensor will quickly (every 0.1 second) sample the distance, then average it. This is used to "reset" the system and get the distance of when the tissue is at 100%.

<p align="center">
    <img src="https://github.com/user-attachments/assets/9d588b4d-5946-4cd6-bf20-ec48d07e6a97">
</p>

### MQTT_App
The main function of the MQTT_App is to receive data from the hardware, process it, and then store it into the database. The database used is the MongoDB Atlas, which is an online database hosted by MongoDB. Mqtt_app process the data in two ways. First, it changes from the raw distance collected into the tissue strength index (TSI), or the precentage of the toilet paper remaining. Second, it changes the collected station name, such as device01 and device02, into floor number and room number via dictionary.
<p align="center">
    <img src="https://github.com/user-attachments/assets/ed2ed6b4-5f44-4680-963f-af99c7e6aa4e">
</p>
<p align="center">
Image of the dictionary
</p>

Note that for the TSI calculation, it needs an input of D which is the distance from the top of the tissue box to the empty toilet paper roll. Additionally, due to potential inaacuracies, If the results from TSI calculation is more than 100 or less than 0, it will be changed to 100 and 0 respectively to avoid breaking the website later on.

<p align="center">
    <img src="https://github.com/user-attachments/assets/eec7ac99-34d3-4518-9777-c1d528706cfb">
</p>
<p align="center">
Image of data to be inserted to the database
</p>

Lastly, mqtt_app also sends a call to the mosquitto every 20 minutes from 6 am to 6 pm, so that the hardware only collect data in relavent period of time, as this project is planned to be implemented in office space such as our study building.

### Rest_app
The function of the rest_app is to get the data from MongoDB and put it into rest api. It will query the database name and find the collection, then put it into the rest url path. In this case it is /toiletpaper/<floor> in the format as seen in the image below.

<p align="center">
    <img src="https://github.com/user-attachments/assets/6ac69665-6b7f-4d78-80f2-b8e1cb37989f">
</p>
# Web UI
<p align="center">
    <img src="https://github.com/user-attachments/assets/2fe2e89e-8588-41a7-b678-dfa7203e8ee6">
</p>

### React_app
## Status Card
hkjhjkhjkhjkhj
## Gauges
## Monthly Statistic
## Room Used Persentage

## Our Members
Mr. Chananyu Kamolsuntron 

Mr. Intouch Wangtrakoondee

Mr. Lihour San
