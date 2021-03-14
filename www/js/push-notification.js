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
function initializeFirebaseMessaging(){
  messaging
      .requestPermission()
      .then(function () {
          //MsgElem.innerHTML = "Notification permission granted." 
          console.log("Notification permission granted.");          
          // get the token in the form of promise
          return messaging.getToken()
      })
      .then(function(token) {
        console.log(token);
        gtoken = token;
          //TokenElem.innerHTML = "token is : " + token
      })
      .catch(function (err) {
          //ErrElem.innerHTML =  ErrElem.innerHTML + "; " + err
          console.log("Unable to get permission to notify.", err);
      });
}

let enableForegroundNotification = true;
messaging.onMessage(function(payload) {
    console.log("Message received. ", payload);
    const notificationOption={
      body:payload.notification.body,
      icon:payload.notification.icon
    };
  
    if(Notification.permission=="granted"){
        var notification = new Notification(payload.notification.title,notificationOption);
        notification.onclick = function (ev){
          ev.preventDefault();
          window.open(payload.notification.click_action,'_blank');
          notification.close();
        }
      }
      /*
      if(enableForegroundNotification) {
          const {title, ...options} = JSON.parse(payload.data.notification);
          navigator.serviceWorker.getRegistrations().then(registration => {
              registration[0].showNotification(title, options);
          });
      }*/
      
});

messaging.onTokenRefresh(function(){
    messaging.getToken()
    .then(function(newtoken){
      console.log("New token : "+newtoken);
    })
    .catch(function (reason) {
      console.log(reason);
    })
})

initializeFirebaseMessaging();
