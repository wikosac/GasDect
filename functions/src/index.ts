// import * as admin from "firebase-admin";

import axios from "axios";

var admin = require("firebase-admin");

var serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gas-monitor-6692b-default-rtdb.firebaseio.com",
});

// Function to make API request and insert response into Firebase
async function fetchDataAndInsertToFirebase() {
  try {
    const response = await axios.get("https://sgp1.blynk.cloud/external/api/get?token=9PWWYxhkSuCnr4OD3VoKrfCPx0WsC4O7&v1"); // Replace with your API endpoint

    const data = response.data; // Assuming the API response is in JSON format

    // Reference to Firebase Realtime Database
    const db = admin.database();

    // Insert data into Firebase Realtime Database
    await db.ref("path/to/insert").set(data); // Replace with the desired path in your database
    console.log("Data inserted into Firebase successfully");
  } catch (error: any) {
    console.error("Error:", error.message);
  }
}

async function fetchContinuously() {
  while (true) {
    await fetchDataAndInsertToFirebase();

    // Delay between API requests (e.g., 5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

// Start fetching data continuously
fetchContinuously();
