var detalle_goleo_functions = {
    ShowImgTorneo:function(){
        if (global_functions.CheckNetConnection()){
            app7.preloader.show();
            $$('#show-img-torneo').html("");
            var nombre_img = "Torneo_"+gcliente.toString()+"_"+gsucursal.toString()+"_"+gidtorneo.toString()+".png";
            var cadena = '<div class="torneo"><img src="http://futcho7.com.mx/MiScore/Imagenes/'+nombre_img+'"/></div>';
            $$('#show-img-torneo').append(cadena);  
            app7.preloader.hide();
        }else{
            app7.dialog.alert("No existe conexión a internet.", "AVISO");
          }

    },
    ShowNomJugador:function(idJugador,idEquipo,numPlayera,nomJugador,nomEquipo){
        $$('#show-dat-jugador').html("");
        var cadena = '<div class="nom_jugador">'+nomJugador+'</div><div class="nom_equipo">'+nomEquipo+'</div><div class="row"><div class="col num_playera">Playera: '+numPlayera+'</div><div class="col num_playera" id="total_goles">Goles:</div></div>'        
        $$('#show-dat-jugador').append(cadena);  
        this.ShowDetalleGoleo(idJugador,idEquipo); /* Aqui se invoca la API */
    },
    ShowDetalleGoleo:function(id_jugador,id_equipo){
        if (global_functions.CheckNetConnection()){
            app7.preloader.show();
            app7.request({ /* PWA */
                url: 'http://futcho7.com.mx/MiScore/WebService/getdetgoleo.php',
                /*url: 'https://cedula.futcho7.com.mx/WebService/getrecords.php',*/
                data:{id_cliente:gcliente,id_sucursal:gsucursal,id_torneo:gidtorneo,id_equipo:id_equipo,id_jugador:id_jugador},
                method: 'POST',
                crossDomain: true,
                success:function(data){
                    var objson = JSON.parse(data);
                    if (objson.status == 1){
                        detalle_goleo_functions.TablaDetGol(objson,function(totgoles){
                            $$('#total_goles').text("Goles: "+totgoles);
                            app7.preloader.hide();
                        });
                    }else{
                        app7.preloader.hide();
                        app7.dialog.alert(objson.mensaje, "AVISO");
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
    TablaDetGol:function(objson,callBack){
        var total_goles = 0;
        var tabladetgol = objson['Datos'];
        var idjornada   = 0;
        var equipoRival = "";
        var numgoles    = 0;
        var cadena      = "";
        var fecha       = "";
        var hora        = "";
        $$('#lista-detalle').html("");
        for (var i=0; i < tabladetgol.length; i++) {
          /* Se barren los jugadores goleadores */
          idjornada     = tabladetgol[i].id_jornada;
          equipoRival   = tabladetgol[i].rival;
          numgoles      = tabladetgol[i].goles;
          fecha         = tabladetgol[i].fecha;
          hora          = tabladetgol[i].hora;
          cadena = cadena + '<div class="block img-background"><div class="block fecha-juego"><div class="row"><div class="col" id="fecha-hora-juego">'+fecha+' '+hora+' J-'+String(idjornada)+'</div></div></div><div class="block det-goles"><div class="row"><div class="col">'+String(numgoles)+'</div><div class="row"><div class="col icon-det-goles"><img src="../img/Balon.ico" width="40"/></div></div></div></div><div class="block det-goleo-equipo"><div class="row"><div class="col" id="equipo-local">'+equipoRival+'</div></div></div></div>';
          total_goles += parseInt(numgoles);
        }
        $$('#lista-detalle').append(cadena);
        callBack(total_goles);
    },
}