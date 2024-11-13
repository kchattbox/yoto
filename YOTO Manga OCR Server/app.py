from flask import Flask, request
from manga_ocr import MangaOcr
import os
import base64

ocr = MangaOcr()

app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == "GET":
        return "<p>Hello, World!</p>"

    data = request.get_json()

    print(data)

    return "I just got POSTed"

@app.route("/upload", methods=['POST', 'GET'])
def upload_file():

    print("POST")

    imageBase64 = request.form['image']
    imageData = base64.b64decode(imageBase64)

    with open('temp.jpeg', 'wb') as fh:
        fh.write(imageData);
        print("data written")

    text = ocr("C:\\Users\\kchat\\Desktop\\Projects\\Test_OCR_Server\\temp.jpeg")

    print(text)

    return {
        "text": text
    }