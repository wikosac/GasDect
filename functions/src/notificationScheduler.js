const axios = require("axios");

async function sendNotification() {
  try {
    const data = await axios.get("https://us-central1-gas-monitor-6692b.cloudfunctions.net/sendNotification");
    console.log("Notification sent successfully");
  } catch (error) {
    console.error("Error sending notification:", error.message);
  }
}

// Call the function at the desired interval

function start() {
  sendNotification();
  setInterval(sendNotification, 5000); // Every 60 seconds
}

start();
