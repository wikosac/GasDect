import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";

admin.initializeApp();

exports.sendNotification = functions.https.onRequest(async (req, res) => {
  try {
    // Fetch data from the other API
    const response = await axios.get("https://sgp1.blynk.cloud/external/api/get?token=9PWWYxhkSuCnr4OD3VoKrfCPx0WsC4O7&v1");
    //token imam
    const token = "ek717vhASwmNLSiRbRn44V:APA91bEDrWmSTrcvbnW9mZHRjXZchVxYMep0l2v-qyGw_-70N4e6T3-xDPuIoObXqYlSD1aIuMY4H-GbSgWX3MjC3CvMs93HSQnbqPmCnqkBwNq9p3K4S7EZ0iDuof-NEpqpPYu9Hvzf";
    //token iwso
    // const token = "fmEEUVhXSkm40Cnn2dAdvA:APA91bGdOAlmb979bxqM3JAoh9pgK74-D9tuJoPfkUT7DcxrgXIDzvSjS7NXlma3tMc2k9kVdemgrqI6urqyw8oxAxEvE5j9LkQT7SmHIGPWMIA_7dbU76NlFDyxGQ7ZfCONQyShFso_";

    const message: admin.messaging.Message = {
      notification: {
        title: "Periksa Gas Anda",
        body: `Nilai kebocoran: ${response.data}`,
      },
      token: token,
    };

    await admin.messaging().send(message);
  } catch (error) {
    res.status(500).send("Error sending notification");
  }
});
