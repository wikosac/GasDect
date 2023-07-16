const axios = require('axios');

async function sendNotification() {
  try {
    await axios.post('https://us-central1-gas-monitor-6692b.cloudfunctions.net/sendNotification');
    console.log('Notification sent successfully');
  } catch (error: any) {
    console.error('Error sending notification:', error.message);
  }
}

// Call the function at the desired interval
setInterval(sendNotification, 3000); // Every 60 seconds
