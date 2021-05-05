var global_functions = {
    ChecaCuenta:function(){
      /*localStorage.removeItem("cuenta");
      /* Las sig 5 líneas de localStorage son nuevas, una vez publicada la app en la play, eliminarlas y actualizar la versión
      localStorage.setItem("cuenta",'01010101');
      localStorage.setItem("nomCliente",'Futcho 7');
      localStorage.setItem("nomSucursal",'Zumpango');
      localStorage.setItem("nomTorneo",'Torneo 7:00PM');
      localStorage.setItem("nomEquipo",'Juventus');*/

      if (localStorage.getItem("cuenta") == null)
      {
        /* La app no está configurada */
        // Create notification with close button
        var notificationWithButton = app7.notification.create({
          icon: '<i class="f7-icons">exclamationmark_triangle_fill</i>',
          title: 'Aviso',
          subtitle: "La app aún no esta configurada, favor ir a la opción de 'configuración'",
          //text: 'Click (x) button to close me',
          closeButton: true,
        });
        notificationWithButton.open();
       
        /*app7.dialog.alert("Falta configurar la cuenta, favor ir al menú y selecciona la opción de 'Configuración'", "AVISO");*/
      }else{
        gcuenta   = localStorage.getItem("cuenta");
        gcliente  = Number(gcuenta.substring(0,2));
        gsucursal = Number(gcuenta.substring(2,4));
        gtorneo   = Number(gcuenta.substring(4,6));
        gequipo   = Number(gcuenta.substring(6,8));
        //glogotipo= localStorage.getItem("logotipo");
        var nomSucursal = localStorage.getItem("nomSucursal");
        var nomCliente = localStorage.getItem("nomCliente");
        this.UpdateAcceso();
        setTimeout(home_functions.CargaTorneos(), 20000); 
        //home_functions.CargaTorneos();

      }
    },  
    CheckNetConnection:function(){
      var xhr = new XMLHttpRequest();
      var file = "https://miscore.futcho7.com.mx/img/MiScore.png";
      var r = Math.round(Math.random() * 10000);
      xhr.open('HEAD', file + "?subins=" + r, false);
      try {
       xhr.send();
       if (xhr.status >= 200 && xhr.status < 304) {
        return true;
       } else {
        return false;
       }
      } catch (e) {
       return false;
      }
     },
    // Se llama a la página home, después de desplegar Splash por una espera de 3 segundos
    WaitSplashScreen:function(){
      setTimeout(function(){mainView.router.navigate('/home/',{animate:true}); },3000);
    },
    UpdateAcceso:function(){
      if (global_functions.CheckNetConnection()){
          app7.preloader.show();
          app7.request({ /* PWA */   
              /*url: 'http://futcho7.com.mx/MiScore/WebService/configcuenta.php',*/
              url: 'https://miscore.futcho7.com.mx/WebService/setfechacceso.php',
              data:{id_cliente:gcliente,id_sucursal:gsucursal,id_torneo:gtorneo,id_equipo:gequipo,id_token:gtoken,plattform:gplatform},
              method: 'POST',
              crossDomain: true,
              success:function(data){
                  app7.preloader.hide();
                  var objson = JSON.parse(data);
                  if (objson.mensaje != "EXITOSO"){
                      console.log(objson.mensaje);
                  }
              },
              error:function(error){
              }
          });
          app7.preloader.hide();
      } else{
          app7.dialog.alert("No existe conexión a internet.", "AVISO");
      }
    },
    
  }