var $$ = Dom7;

var gcuenta           = "";
var gcliente          = 0;
var gsucursal         = 0;
var gtorneo           = 0;
var gequipo           = 0;
var gidtorneo         = 0;
var gnomtorneos       = [];
var gjornada          = 0;
var gtoken            = "";
var gplatform         = " ";
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
        },*/
        
      },
      {
        path: '/show-info/:idTorneo',
        /*url: 'views/show-info.html',*/
        url: 'views/show-info.html',
        name: 'show-info',
      },
      {
        /* equipo y jugador son los id's (no los nombres), estos se obtendrán accesando el id correspondiente a c/u de ellos */
        path: '/detalle-goleo/:equipo/:jugador/:playera/:nomJugador/:nomEquipo',
        url: 'views/detalle-goleo.html',
        name: 'detalle-goleo',
      },
    
      
    ],
    // ... other parameters
});

var mainView = app7.views.create('.view-main');
  
$$(document).on('page:init', '.page[data-name="home"]', function (e){
/*
  window.screen.orientation
             .lock("portrait-secondary")
             .then(
               (success) => console.log(success)
             , (failure) => console.log(failure)
             )
             */
  if (isMobile.apple.device) {
    gplatform = 'iOS';
  }else if (isMobile.android.device) {
    gplatform = 'Android';
  }else{
    gplatform = 'otro';
  }

  global_functions.ChecaCuenta();
});


$$(document).on('page:init', '.page[data-name="settings"]', function (e, page){
  settings_functions.ChecaSettings();
/*
  page.$el.find('#toggle-1').on('change', function () { 
    var toggle = app7.toggle.get('#toggle-1');
    if (toggle.checked) {
      app7.dialog.alert("Está prendido");
      settings_functions.subscribeToPushNotification();
      // do something
    }else{
      app7.dialog.alert("Está apagado");
      settings_functions.unsubscribeFromPushNotification();
    }
 
    if ($$('#toggle-1').prop('checked') == true) {
      app7.dialog.alert("Está prendido");
      /*settings_functions.subscribeToPushNotification();
    } else {
      app7.dialog.alert("Está apagado");
      /*settings_functions.unsubscribeFromPushNotification();
    }
    
  });*/
});

$$(document).on('page:beforein', '.page[data-name="show-info"]', function (e){
  /* Antes de abrir, muestra el nombre del torneo */
  const page = e.detail;
  var idTorneo = page.route.params.idTorneo;
  gidtorneo = idTorneo;
  show_info_functions.ShowNomtorneo();
});

$$(document).on('page:init', '.page[data-name="show-info"]', function (e){
  const page = e.detail;
  var idTorneo = page.route.params.idTorneo;
  gidtorneo = idTorneo;
  show_info_functions.ShowImgTorneo();
});

$$(document).on('page:init', '.page[data-name="detalle-goleo"]', function (e){
  //En el objeto e, se guardaron los parámetros que se enviaron de la tabla de goleo
  const page = e.detail;
  var id_equipo   = page.route.params.equipo;
  var id_jugador  = page.route.params.jugador;
  var num_playera = page.route.params.playera;
  var nomJugador  = page.route.params.nomJugador;
  var nomEquipo   = page.route.params.nomEquipo;
  /* Se invoca a la function que muestra los datos del jugador en cuestión, posteriormente en dicha function(ShowNomJugador)
     se invoca a la API y su llenado de la cadena para ser mostrada */
  detalle_goleo_functions.ShowNomJugador(id_jugador,id_equipo,num_playera,nomJugador,nomEquipo);
});



/* Listener para el tabbar GENERAL,GOLEO, ETC */
app7.on('tabShow',function (e,t){
  if(e.id != "tab-1"){
    $$('#ico_rotation').html('<i class="material-icons icon-custom icon-not-visible">screen_rotation</i>');
    if(e.id == "tab-2"){
      show_info_functions.ShowTablaGoleo();
    }
    if(e.id == "tab-3"){
     resultados_functions.ShowAcordionJornada();
    }
    
  }else{
    $$('#ico_rotation').html('<i class="material-icons icon-custom">screen_rotation</i>');
  }
  
});


app7.on('accordionOpen',function (el) {
  var numJornada = 0;
  var cadenaJornada = "";
  var posi = 0;

   // Obtener título, buscando por clase, desde el elemento recibido
   let titulo = el.querySelector('.item-title');
   // Mostrar ID del título
   //console.log(titulo.id);           // numero_jornada
   // Mostrar contenido del título
   cadenaJornada = titulo.textContent;  // Jornada #
   posi = cadenaJornada.indexOf(" ");
   numJornada = parseInt(cadenaJornada.substring(posi));
   $$('#show-resul-jor-'+numJornada).html("");
   resultados_functions.EjecutaApi(numJornada);
  /* según lo sig. es para que el scroll al abrir la jornada, suba hasta arriba, pero no jala
  const openedItem = el;
  const offset = $$(openedItem).offset().top;
  const navHeight = 56;
  const toolbarHeight = 48;
  const scrollTop = $(el).parents('.page-content').scrollTop();
  $(el).parents('.page-content').scrollTop((offset - navHeight - toolbarHeight + scrollTop), 300);
  */
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