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
    <img src="[https://github.com/user-attachments/assets/a1c14748-8bd7-4168-9f74-5edce146eb19](https://github.com/Lihour21/toilet-paper-porject-2025/blob/main/images/image-2.png)">
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

## Our Members
Mr. Chananyu Kamolsuntron 

Mr. Intouch Wangtrakoondee

Mr. Lihour San
