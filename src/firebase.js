import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAgw_QBvsF94T3_PtxVy8VBVDX_-mBMwQU",
  authDomain: "running-f9d57.firebaseapp.com",
  projectId: "running-f9d57",
  storageBucket: "running-f9d57.firebasestorage.app",
  messagingSenderId: "219524855610",
  appId: "1:219524855610:web:9c74d370a5d38b6dafc203",
  measurementId: "G-4XHN0CFN9R",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey:
        "BCevhWlDeXuijAqTU5sQv5MZ5T0RPCChAmKEYrftOQHRq-nA5QbUT4BnNpnBP59Y8sAq8kgVjvXV-5DD6sOPnLk",
    });
    if (token) {
      console.log("FCM Token:", token);
      return token;
    } else {
      console.log("No registration token available.");
    }
  } catch (err) {
    console.error("Error retrieving token:", err);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
