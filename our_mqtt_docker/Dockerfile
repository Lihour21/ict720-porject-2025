FROM python:3.11.4

WORKDIR /python-docker
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "-u", "mqtt_receiver.py"]