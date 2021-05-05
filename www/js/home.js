var home_functions = {
    CargaTorneos:function(){
        if (global_functions.CheckNetConnection()){
            /* La cuenta, se divide por el valor correspondiente a cliente/sucursal/torneo/equipo */
            var cuentastring = localStorage.getItem("cuenta");
            var cliente = Number(cuentastring.substring(0,2));
            var sucursal= Number(cuentastring.substring(2,4));
            var numjuegos = 0;
            app7.preloader.show();
            app7.request({ /* PWA */
                /*url: 'http://futcho7.com.mx/MiScore/WebService/getrecordstorneo.php',*/
                url: 'https://miscore.futcho7.com.mx/WebService/getrecordstorneo.php',
                data:{id_cliente:cliente,id_sucursal:sucursal},
                method: 'POST',
                crossDomain: true,
                success:function(data){
                    var objson = JSON.parse(data);
                    if (objson.status == 0){
                        home_functions.MuestraTorneos(objson,function(f){
                            var cadena2 = '<p class="version">ver 2.0</p>'
                            $$('#lista-torneos').append(cadena2);
                            app7.preloader.hide();
                            /*app7.dialog.alert("El proceso ha concluido, el dispositivo cuenta con "+String(gjuegosCargados)+" juegos, puedes continuar con la elaboración de la cédula arbitral para cada uno de ellos.", "Carga de Datos");*/
                        });
                    }else{
                        app7.preloader.hide();
                        if(objson.status == 1){
                            app7.dialog.alert(objson.mensaje+' '+objson.error+", probable existe un error en la cuenta, favor de reportarlo con la liga para su solución.", "AVISO");
                        }else{
                            app7.dialog.alert("Existe un error, favor de reportarlo con la liga ("+objson.mensaje+' '+objson.error+").", "AVISO");
                        }
                    }
                },

                error:function(error){

                }
            });
            //app7.preloader.hide();
          }else{
            app7.dialog.alert("No existe conexión a internet.", "AVISO");
          }
    },
    MuestraTorneos: function(objson,callBack){
        var cliente = Number(localStorage.getItem("cuenta").substring(0,2));
        var sucursal= Number(localStorage.getItem("cuenta").substring(2,4));
        var numeroTorneos = 0;
        var torneos = objson['Datos'];
        $$('#lista-torneos').html("");
        for (var i=0; i < torneos.length; i++) {
            /* Se barren los torneos involucrados */
            var id_torneo = torneos[i].id_torneo;
            var nombre_torneo = torneos[i].tor_nombre;
            var torneo_orden = torneos[i].tor_orden_miscore
            gnomtorneos.push(id_torneo,nombre_torneo);
            var nombre_imagen = "Torneo_"+cliente.toString()+"_"+sucursal.toString()+"_"+id_torneo.toString()+".png";
            var cadena = '<div class="block-torneo"><div class="torneo" id="id_torneo_'+id_torneo+'" onclick = "home_functions.ShowInfo('+id_torneo+')"><img src="https://miscore.futcho7.com.mx/img/'+nombre_imagen+'"/></div></div>';
            $$('#lista-torneos').append(cadena);  
        }

        //app7.preloader.hide();
        callBack("OK");
    },
    ShowInfo: function(idTorneo,callBack){
        mainView.router.navigate(`/show-info/${idTorneo}/`,{animate:false});
    },

}