import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";

admin.initializeApp();

exports.sendNotification = functions.https.onRequest(async (req, res) => {
  try {
    // Fetch data from the other API
    const response = await axios.get("https://sgp1.blynk.cloud/external/api/get?token=9PWWYxhkSuCnr4OD3VoKrfCPx0WsC4O7&v1");
    const value = response.data
    //token imam
    const token = "ek717vhASwmNLSiRbRn44V:APA91bEDrWmSTrcvbnW9mZHRjXZchVxYMep0l2v-qyGw_-70N4e6T3-xDPuIoObXqYlSD1aIuMY4H-GbSgWX3MjC3CvMs93HSQnbqPmCnqkBwNq9p3K4S7EZ0iDuof-NEpqpPYu9Hvzf";
    //token iwso
    // const token = "fmEEUVhXSkm40Cnn2dAdvA:APA91bGdOAlmb979bxqM3JAoh9pgK74-D9tuJoPfkUT7DcxrgXIDzvSjS7NXlma3tMc2k9kVdemgrqI6urqyw8oxAxEvE5j9LkQT7SmHIGPWMIA_7dbU76NlFDyxGQ7ZfCONQyShFso_";

    if (value >= 400) {
      const message: admin.messaging.Message = {
        notification: {
          title: "Periksa Gas Anda",
          body: `Nilai kebocoran: ${value}`,
        },
        token: token,
      };

      await admin.messaging().send(message);
      
      res.status(200).send("Notification sent");
    } else {
      res.status(200).send("Condition not met");
    }
  } catch (error) {
    res.status(500).send("Error sending notification");
  }
});
