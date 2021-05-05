var settings_functions = {
    ChecaSettings:function(){
        if (localStorage.getItem("cuenta") !== null){
          /* La cuenta ya está configurada, se muestran los valores */
          $$('#num-cuenta').val(localStorage.getItem("cuenta"));

        }
        /*
        if (Notification.permission === 'granted') {
            $$('#toggle-1').html('<input type="checkbox" checked /><span class="toggle-icon"></span>');
          }
        */
    },
    ConfiguraCuenta:function(){
        var lserror = 0;
        /* Se valida si hay cambio en el número de cuenta, si es verdadero, se llama a la API */
        var cuenta  = $$('#num-cuenta').val();
        var cuentastring = cuenta.toString();
        /* Validaciones */
        if (cuentastring.length != 8){
            app7.dialog.alert("La cuenta debe de tener 8 números, vuelva a intentarlo", "AVISO");
            lserror = 1;
        }
        if (cuentastring != localStorage.getItem("cuenta") && lserror == 0){
            /* La cuenta cambió, se debe de invocar a la API */
            if (global_functions.CheckNetConnection()){
                app7.preloader.show();
                /* La cuenta, se divide por el valor correspondiente a cliente/sucursal/torneo/equipo */
                var cliente = Number(cuentastring.substring(0,2));
                var sucursal= Number(cuentastring.substring(2,4));
                var torneo  = Number(cuentastring.substring(4,6));
                var equipo  = Number(cuentastring.substring(6,8)); 
                app7.request({ /* PWA */   
                    /*url: 'http://futcho7.com.mx/MiScore/WebService/configcuenta.php',*/
                    url: 'https://miscore.futcho7.com.mx/WebService/configcuenta.php',
                    data:{id_cliente:cliente,id_sucursal:sucursal,id_torneo:torneo,id_equipo:equipo,id_token:gtoken,plattform:gplatform},
                    method: 'POST',
                    crossDomain: true,
                    success:function(data){
                        app7.preloader.hide();
                        var objson = JSON.parse(data);
                        if (objson.mensaje == "EXITOSO"){
                            /* Se asignan a variables los valores correspondientes */
                            var nomCliente  = objson.Datos[0].cli_nombre;
                            var nomSucursal = objson.Datos[0].suc_nombre;
                            var nomTorneo   = objson.Datos[0].tor_nombre;
                            var nomEquipo   = objson.Datos[0].equ_nombre;
                            /*var cliLogo     = objson.Datos[0].cli_logo;*/
                            /* Se almacenan en localStorage: cuenta,nombre de cliente, nombre de sucursal, minutos y periodos */
                            localStorage.setItem("cuenta",cuentastring);
                            localStorage.setItem("nomCliente",nomCliente);
                            localStorage.setItem("nomSucursal",nomSucursal);
                            localStorage.setItem("nomTorneo",nomTorneo);
                            localStorage.setItem("nomEquipo",nomEquipo);
                            /*localStorage.setItem("logotipo",cliLogo);*/
        
                            app7.dialog.alert(nomEquipo+"... Bienvenido al seguimiento de tú torneo "+nomTorneo+" en la liga "+nomCliente+" sucursal "+nomSucursal+"\, la configuración fue exitosa", "AVISO");
                            }else{
                                console.log(objson.mensaje);
                                app7.dialog.alert("La cuenta no existe, revise si hay un error, caso contrario... favor de reportarlo en la oficina de la liga", "AVISO");
                            }
                    },
                    error:function(error){
                    }
                });
                app7.preloader.hide();
            } else{
                app7.dialog.alert("No existe conexión a internet.", "AVISO");
            }
        }else{
            if (lserror == 0){
                /* No cambió la cuenta, solo se actualizan los valores de minutos,periodos en los localStorage, los cuales no contiene error 
                localStorage.setItem("minutos",minutos);
                localStorage.setItem("periodos",periodos);
                */
                app7.dialog.alert("No se detectó ningún cambio en la cuenta", "AVISO");
            }
        }
    },
    /*
    unsubscribeFromPushNotification:function() {
        navigator.serviceWorker.ready
        .then(function(registration) {
            registration.pushManager.getSubscription()
            .then(function (subscription) {
                console.log(subscription);
                if(!subscription) {
                    alert('No se puede cancelar la suscripción a las notificaciones.');
                    return;
                }
                subscription.unsubscribe()
                .then(function () {
                    console.log('Canceladas las notificaciones.');
                    console.log(subscription);
                    /*this.updatePushNotificationStatus(false);
                 })
                .catch(function (error) {
                    console.error(error);
                });
            })
            .catch(function (error) {
                console.error('No fue posible cancelar las notificaciones');
             });
        })
    },
    subscribeToPushNotification:function() {
        initializeFirebaseMessaging();
        /*
        navigator.serviceWorker.ready
        .then(function(registration) {
            if (!registration.pushManager) {
                alert('Tú browser no soporta recibir notificaciones.');
                return false;
            }
            //---to subscribe push notification using pushmanager---
            registration.pushManager.subscribe(
            //---always show notification when received---
            { userVisibleOnly: true }
            )
            .then(function (subscription) {
                console.log('Suscrito al recibo de notificaciones.');
                console.log(subscription);
                updatePushNotificationStatus(true);
            })
            .catch(function (error) {
                updatePushNotificationStatus(false);
                console.error('Error al suscribir notificaciones: ', error);
            });
        })
        
    }*/
   
}
