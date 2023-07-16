import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";

admin.initializeApp();

exports.sendNotification = functions.https.onRequest(async (req, res) => {
  try {
    // Fetch data from the other API
    const response = await axios.get("https://sgp1.blynk.cloud/external/api/get?token=9PWWYxhkSuCnr4OD3VoKrfCPx0WsC4O7&v1");
    const value = response.data;
    const token = "fmEEUVhXSkm40Cnn2dAdvA:APA91bGdOAlmb979bxqM3JAoh9pgK74-D9tuJoPfkUT7DcxrgXIDzvSjS7NXlma3tMc2k9kVdemgrqI6urqyw8oxAxEvE5j9LkQT7SmHIGPWMIA_7dbU76NlFDyxGQ7ZfCONQyShFso_";

    // Evaluate condition based on data from the other API
    if (value >= 100) {
      const message: admin.messaging.Message = {
        notification: {
          title: "Periksa Gas Anda",
          body: `Nilai kebocoran: ${value}`,
        },
        token: token,
      };

      await admin.messaging().send(message);
      
      res.status(200).send("Notification sent successfully");
    } else {
      res.status(200).send("Condition not met, skipping notification");
    }
  } catch (error) {
    res.status(500).send("Error sending notification");
  }
});
