var $$ = Dom7;

var gcuenta           = "";
var gcliente          = 0;
var gsucursal         = 0;
var gtorneo           = 0;
var gequipo           = 0;
//var glogotipo         = "";

var app7 = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'Mi Score',
    // App id
    id: 'com.MiScore.app',
    // Enable swipe panel
    panel: {
      swipe: true,
    },
    // Add default routes
    routes: [
      {
        path: '/about/',
        url: 'about.html',
      },
      {
        path: '/home/',
        url: 'views/home.html',
      },
      {
        path: '/settings/',
        url: 'views/settings.html',
        /*
        options:{
          transition: 'f7-flip', 
        },
        */
      },
    ],
    // ... other parameters
});

var mainView = app7.views.create('.view-main');
  
$$(document).on('page:init', '.page[data-name="home"]', function (e){
  global_functions.ChecaCuenta();
});

$$(document).on('page:init', '.page[data-name="settings"]', function (e){
  settings_functions.ChecaSettings();
});


var app = {
  /*
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
    */
};

