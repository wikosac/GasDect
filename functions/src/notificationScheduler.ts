const axios = require("axios");

async function sendNotification() {
  try {
    await axios.get("http://127.0.0.1:5001/gas-monitor-6692b/us-central1/sendNotification");
    console.log("Notification sent successfully");
  } catch (error: any) {
    console.error("Error sending notification:", error.message);
  }
}

// Call the function at the desired interval
sendNotification();
setInterval(sendNotification, 30000); // Every 60 seconds
