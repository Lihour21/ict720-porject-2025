# ict720-porject-2025
Rep for demo idea, and code fo ICT720 cource of 2025

# Our Members
Mr. Chananyu Kamolsuntron 

Mr. Intouch Wangtrakoondee

Mr. Lihour San

# User stories 
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

## Project Diagram
<p align="center">
    <img src="https://github.com/user-attachments/assets/a1c14748-8bd7-4168-9f74-5edce146eb19">
</p>

## Database Design

