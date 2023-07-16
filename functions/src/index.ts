import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";

admin.initializeApp();

exports.sendNotification = functions.https.onRequest(async (req, res) => {
  // const { token, title, body } = req.body;

  try {
    // Fetch data from the other API
    const response = await axios.get("https://sgp1.blynk.cloud/external/api/get?token=9PWWYxhkSuCnr4OD3VoKrfCPx0WsC4O7&v1");
    const data = response.data;
    const token = 'fmEEUVhXSkm40Cnn2dAdvA:APA91bGdOAlmb979bxqM3JAoh9pgK74-D9tuJoPfkUT7DcxrgXIDzvSjS7NXlma3tMc2k9kVdemgrqI6urqyw8oxAxEvE5j9LkQT7SmHIGPWMIA_7dbU76NlFDyxGQ7ZfCONQyShFso_';
    // const topic = 'api_response_value';

    // Subs
    // admin.messaging().subscribeToTopic(token, topic)
    //   .then(() => {
    //     console.log('Token perangkat berhasil didaftarkan ke topik:', topic);
    //   })
    //   .catch((error) => {
    //     console.log('Kesalahan saat mendaftarkan token perangkat ke topik:', error);
    //   });

    // Evaluate condition based on data from the other API
    if (data >= 400) {
      const message: admin.messaging.Message = {
        notification: {
          title: "Periksa Gas Anda",
          body: `Nilai kebocoran: ${data}`,
        },
        token: token,
      };

      const fcmResponse = await admin.messaging().send(message);
      console.log("Notification sent successfully:", fcmResponse);
      res.status(200).send("Notification sent successfully");
    } else {
      console.log("Condition not met, skipping notification");
      res.status(200).send("Condition not met, skipping notification");
    }
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).send("Error sending notification");
  }
});
