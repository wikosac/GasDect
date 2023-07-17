const axios = require("axios");

setInterval(run, 5000); // Every 5 seconds

// Call the function at the desired interval
function run() {
  const response = axios.get("https://sgp1.blynk.cloud/external/api/get?token=9PWWYxhkSuCnr4OD3VoKrfCPx0WsC4O7&v1");
  if (response.data >= 400) {
    sendNotification();
    console.log("Notification sent successfully");
  } else {
    console.log("Condition not met, skipping notification");
  }
}

async function sendNotification() {
  try {
    //live cloud functions
    await axios.get("https://us-central1-gas-monitor-6692b.cloudfunctions.net/sendNotification");
    //local test
    // await axios.get("http://127.0.0.1:5001/gas-monitor-6692b/us-central1/sendNotification");
  } catch (error: any) {
    console.error("Error sending notification:", error.message);
  }
}
