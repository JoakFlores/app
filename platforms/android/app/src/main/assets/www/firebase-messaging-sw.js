importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyB-NbT_Z3B2vfumL2t6bxNpoB5a-r2u6OM",
    authDomain: "alert-sol-90122.firebaseapp.com",
    databaseURL: "https://alert-sol-90122.firebaseio.com",
    projectId: "alert-sol-90122",
    storageBucket: "alert-sol-90122.appspot.com",
    messagingSenderId: "217053576965",
    appId: "1:217053576965:android:1be1c6426df6653ce1c16c",
    measurementId: ""
    };
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log(payload);
    const notification = JSON.parse(payload);
    const notificationOption={
        body:notification.body,
        icon:notification.icon
    };
    return self.registration.showNotification(payload.notification.title,notificationOption);
});