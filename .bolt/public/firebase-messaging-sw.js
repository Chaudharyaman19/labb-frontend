/* public/firebase-messaging-sw.js */
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyAgw_QBvsF94T3_PtxVy8VBVDX_-mBMwQU",
  authDomain: "running-f9d57.firebaseapp.com",
  projectId: "running-f9d57",
  messagingSenderId: "219524855610",
  appId: "1:219524855610:web:9c74d370a5d38b6dafc203",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Background message received: ", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo192.png",
  });
});
