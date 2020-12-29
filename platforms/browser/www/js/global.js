var global_functions = {
    ChecaCuenta:function(){
      /*localStorage.removeItem("cuenta");*/
      if (localStorage.getItem("cuenta") == null){
        console.log("Está adentro de ChecaCuenta 2");
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
        console.log("Se fue por el ELSE");
        gcuenta = localStorage.getItem("cuenta");
        gcliente = Number(gcuenta.substring(0,2));
        gsucursal= Number(gcuenta.substring(2,4));
        glogotipo= localStorage.getItem("logotipo");
        var nomSucursal = localStorage.getItem("nomSucursal");
        var nomCliente = localStorage.getItem("nomCliente");
        //Borra contenido de lista-jugadores
        $$('#datos-cte-sede').html("");
        var cadena = '<p id="nomLiga" class="texto-nomliga">'+nomCliente+'</p><p class="texto-sede">Sede:</p><p id="nomSede" class="nombre-sede">'+nomSucursal+'</p><p class="texto-version">V1.7</p>';
        $$('#datos-cte-sede').append(cadena);
        //$$('#nomSede').text(nomSucursal);
        //$$('#nomLiga').text(nomCliente);
      }
    },
    CheckNetConnection:function(){
      var xhr = new XMLHttpRequest();
      var file = "https://cedula.futcho7.com.mx/img/cedula.png";
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
    
  }