from flask import Flask, request, jsonify , send_from_directory
import tensorflow as tf
#from tensorflow.keras.preprocessing.image import img_to_array
import numpy as np
from PIL import Image
import os
import uuid
from flask_cors import CORS
import cv2

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow requests from React

# Folder for saving uploaded files
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load the model
model = tf.keras.models.load_model("/Users/aparnabhutada/Desktop/ourproject/brain_tumor_good.h5")

def preprocess_image(image_path):
    # Load the image using OpenCV
    img = cv2.imread(image_path)

    # Convert the image to RGB if it was loaded as BGR (OpenCV default)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Resize the image to the model's input size (150x150)
    img = cv2.resize(img, (150 , 150))

     # Normalize pixel values to [0, 1]
    img_array = img / 255.0

     # Add batch dimension (1, height, width, channels)
    img_array = np.expand_dims(img_array, axis=0)

    # # Convert the image to a NumPy array
    # img_array = np.array(img)

    # # Reshape the image for the model (batch_size, height, width, channels)
    # img_array = img_array.reshape(1,150, 150, 3)

    # Normalize pixel values to [0, 1]
    #img_array = img_array / 255.0

    return img_array

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    file = request.files["file"]

    # Save the file
    filename = f"{uuid.uuid4().hex}_{file.filename}"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    # Preprocess the image
    image = preprocess_image(filepath)

    # Make prediction
    prediction = model.predict(image)

    # Get the predicted class with the highest probability
    predicted_class = np.argmax(prediction, axis=1)[0]

    # Map the predicted class to a label
    class_labels = ["Glioma Tumor", "Meningioma Tumor", "No Tumor", "Pituitary Tumor"]
    result = class_labels[predicted_class]

    # For debugging, print the model's prediction probabilities
    print(f"Prediction probabilities: {prediction}")

    return jsonify({"result": result, "filename": filename})

# Route to serve uploaded files
@app.route("/uploads/<filename>")
def serve_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)



if __name__ == "_main_":
    app.run(debug=True)