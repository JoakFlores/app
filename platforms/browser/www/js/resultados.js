var resultados_functions = {
    ShowAcordionJornada:function(){
        if (global_functions.CheckNetConnection()){
            app7.preloader.show();
            $$('#show-resultados-acordion').html("");
            var cadenajornadas = "<ul>";
            for (var y=gjornada + 1; y > 0; y--) {
                //Se anexa dentro del <div class="accordion-item-content"> un juego de ejemplo, para no tener problemas con la
                //propiedad height : 0px, cin el juego de ejemplo dicha propiedad ya se pone en height: auto
                cadenajornadas += '<li class="accordion-item"><a class="item-content item-link" href="#"><div class="item-inner"><div class="item-title" id="numero_jornada">Jornada '+y.toString()+'</div></div></a><div class="accordion-item-content custom-item-content"><div class="block" id="show-resul-jor-'+y.toString()+'"><div class="block block-resultados-sel0"><div class="block block-resultados-sel1"><div class="row row-resultados-sel-text1"><div class="col">2020-99-99 15:00:00</div></div><div class="row row-resultados-sel-text1"><div class="col row-resultados-sel-text3">Local</div><div class="col col-marcador-text">0 - 0</div><div class="col row-resultados-sel-text3">Visita</div></div><div class="row row-resultados-sel-text1"><div class="block block-tarjetas-local"><div class="col icon-resul-goles"><img src="../img/tarjeta_amarilla.png" width="25"/></div><div class="col col-tarjetas">0</div><div class="col icon-resul-goles"><img src="../img/tarjeta_roja.png" width="25"/></div><div class="col col-tarjetas">0</div></div><div class="block block-tarjetas-visita"><div class="col icon-resul-goles"><img src="../img/tarjeta_amarilla.png" width="25"/></div><div class="col col-tarjetas">0</div><div class="col icon-resul-goles"><img src="../img/tarjeta_roja.png" width="25"/></div><div class="col col-tarjetas">0</div></div></div></div></div></div></div></li>';
            }
            cadenajornadas += '</ul>'
            $$('#show-resultados-acordion').append(cadenajornadas);  
            app7.preloader.hide();
        }else{
            app7.dialog.alert("No existe conexión a internet.", "AVISO");
          }

    },
    EjecutaApi:function(jornada) {
        if (global_functions.CheckNetConnection()){
            
            app7.preloader.show();
            app7.request({ /* PWA */
                url: 'http://futcho7.com.mx/MiScore/WebService/getcaljuegosnvaver.php',
                /*url: 'https://cedula.futcho7.com.mx/WebService/getrecords.php',*/
                data:{id_cliente:gcliente,id_sucursal:gsucursal,id_torneo:gidtorneo,id_jornada:jornada},
                method: 'POST',
                crossDomain: true,
                success:function(data){
                    var objson = JSON.parse(data);
                    if (objson.status == 1){
                        resultados_functions.ShowResultados(objson,jornada,function(f){
                            app7.preloader.hide();
                        });
                    }else{
                        app7.preloader.hide();
                        app7.dialog.alert(objson.mensaje+'(Jornada '+objson.jornada+')', "AVISO");
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
    ShowResultados:function(objson,jornada,callBack){
        var resultados      = objson['Datos'];
        var fecha           = "";
        var hora            = "";
        var equipoLocal     = "";
        var golesLocal      = 0;
        var amaLocal        = 0;
        var rojLocal        = 0;
        var equipoVisita    = "";
        var golesVisita     = 0;
        var amaVisita       = 0;
        var rojVisita       = 0;
        var cadenares       = "";

        $$('#show-resul-jor-'+jornada).html("");
        for (var i=0; i < resultados.length; i++) {
          /* Se barren los resultados para c/u de los juegos involucrados en la jornada correspondiente 
             Cuando la variable (i) sea par, corresponde a los datos del equipo Visita y es el cierre de la cadena*/
          if(resultados[i].locvis == "V"){
            equipoVisita = resultados[i].equipo;
            golesVisita  = resultados[i].marcador;
            amaVisita    = resultados[i].amarilla;
            rojVisita    = resultados[i].roja;
            cadenares  = cadenares +'<div class="block block-resultados-sel0"><div class="block block-resultados-sel1"><div class="row row-resultados-sel-text1"><div class="col">'+fecha+' '+hora+'</div></div><div class="row row-resultados-sel-text1"><div class="col row-resultados-sel-text3">'+equipoLocal+'</div><div class="col col-marcador-text">'+golesLocal+' - '+golesVisita+'</div><div class="col row-resultados-sel-text3">'+equipoVisita+'</div></div><div class="row row-resultados-sel-text1"><div class="block block-tarjetas-local"><div class="col icon-resul-goles"><img src="../img/tarjeta_amarilla.png" width="25"/></div><div class="col col-tarjetas">'+amaLocal+'</div><div class="col icon-resul-goles"><img src="../img/tarjeta_roja.png" width="25"/></div><div class="col col-tarjetas">'+rojLocal+'</div></div><div class="block block-tarjetas-visita"><div class="col icon-resul-goles"><img src="../img/tarjeta_amarilla.png" width="25"/></div><div class="col col-tarjetas">'+amaVisita+'</div><div class="col icon-resul-goles"><img src="../img/tarjeta_roja.png" width="25"/></div><div class="col col-tarjetas">'+rojVisita+'</div></div></div></div></div>';
          }else{
            fecha = resultados[i].fecha;
            hora  = resultados[i].hora;
            equipoLocal = resultados[i].equipo;
            golesLocal = resultados[i].marcador;
            amaLocal = resultados[i].amarilla;
            rojLocal = resultados[i].roja;
          }
        }
        $$('#show-resul-jor-'+jornada).append(cadenares);
        callBack("OK");
    },
}
