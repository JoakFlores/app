var show_info_functions = {
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
    ShowNomtorneo:function(){
        var nombre_torneo = "";
        /* Recorremos el array de Torneos para determinar el nombre del id_torneo seleccionado desde el home */
        for (var i=0; i < gnomtorneos.length; i++) {
            /* En las posiciones pares del array, corresponden al id del torneo el cual hay que comparar*/
            if(i%2 == 0){
                //Es número par
                if(gnomtorneos[i] == gidtorneo){
                    nombre_torneo = gnomtorneos[i+1];
                    i=1000;
                }
            }
        }
        $$('#navbar-show-info').html("");
        var cadena = '<div class="navbar-bg"></div><div class="navbar-inner"><div class="left"><a href="#" class="link back"><i class="f7-icons icon-custom">arrow_left</i></a></div><div class="title navbar-tipo-letra" id="nom_torneo_'+gidtorneo+'">'+nombre_torneo+'</div><div class="right"><a href="#" class="link" id="ico_rotation"><i class="material-icons icon-custom">screen_rotation</i></a></div></div>';
        $$('#navbar-show-info').append(cadena);  
        this.ShowTablaGnrl();
    },
    ShowTablaGnrl:function(){
        if (global_functions.CheckNetConnection()){
            app7.preloader.show();
            app7.request({ /* PWA */
                url: 'http://futcho7.com.mx/MiScore/WebService/gettablaposnvaver.php',
                /*url: 'https://cedula.futcho7.com.mx/WebService/getrecords.php',*/
                data:{id_cliente:gcliente,id_sucursal:gsucursal,id_torneo:gidtorneo},
                method: 'POST',
                crossDomain: true,
                success:function(data){
                    var objson = JSON.parse(data);
                    if (objson.status == 1){
                        show_info_functions.TablaPos(objson,function(f){
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
    TablaPos:function(objson,callBack){
        var tablagrl            = objson['Datos'];
        var equipo              = "";
        var jj                  = 0;
        var jg                  = 0;
        var je                  = 0;
        var jp                  = 0;
        var gf                  = 0;
        var ge                  = 0;
        var dif                 = 0;
        var puntos              = 0;
        var cadenaen            = "";
        var cadenaen_landscape  = "";
        var cadenade            = "";
        var cadenade_landscape  = "";
        var bandera             = 0;
        gjornada                = objson.jornada;
        /*Obtenemos el nombre del torneo mostrado en el NavBar, se le concatena la jornada en curso
        de dicho torneo y se asigna de nuevo dicho titulo */
        var cadenaJornada       = $$('#nom_torneo_'+gidtorneo).text();
        cadenaJornada           = cadenaJornada + ' (J-' + String(gjornada) + ')'
        $$('#nom_torneo_'+String(gidtorneo)).text(cadenaJornada);

        $$('#show-tabla-general').html("");
        $$('#show-tabla-general-landscape').html("");
        cadenaen            = '<table><thead><tr><th class="label-cell col-titulo-tabla">EQUIPO</th><th class="numeric-cell">JJ</th><th class="numeric-cell">DIF</th><th class="numeric-cell">PTS</th></tr></thead>';
        cadenaen_landscape  = '<table><thead><tr><th class="label-cell col-titulo-tabla">EQUIPO</th><th class="numeric-cell">JJ</th><th class="numeric-cell">JG</th><th class="numeric-cell">JE</th><th class="numeric-cell">JP</th><th class="numeric-cell">GF</th><th class="numeric-cell">JE</th><th class="numeric-cell">DIF</th><th class="numeric-cell">PTOS</th></tr></thead>';
        for (var i=0; i < tablagrl.length; i++) {
          /* Se barren los torneos involucrados */
          equipo  = tablagrl[i].equ_nombre;
          jj = tablagrl[i].jj;
          jg = tablagrl[i].jg;
          je = tablagrl[i].je;
          jp = tablagrl[i].jp;
          gf = tablagrl[i].gf;
          ge = tablagrl[i].ge;
          dif = tablagrl[i].dif;
          puntos = tablagrl[i].puntos;
          if(bandera == 0){
              cadenade          = cadenaen + '<tbody class = "col-formato"><tr><td class="label-cell">'+equipo+'</td><td class="numeric-cell">'+jj+'</td><td class="numeric-cell">'+dif+'</td><td class="numeric-cell">'+puntos+'</td></tr></tbody>';
              cadenade_landscape= cadenaen_landscape + '<tbody class = "col-formato"><tr><td class="label-cell">'+equipo+'</td><td class="numeric-cell">'+jj+'</td><td class="numeric-cell">'+jg+'</td><td class="numeric-cell">'+je+'</td><td class="numeric-cell">'+jp+'</td><td class="numeric-cell">'+gf+'</td><td class="numeric-cell">'+ge+'</td><td class="numeric-cell">'+dif+'</td><td class="numeric-cell">'+puntos+'</td></tr></tbody>';
              bandera = 1;
          }else{
            cadenade            = cadenade + '<tbody class = "col-formato"><tr><td class="label-cell">'+equipo+'</td><td class="numeric-cell">'+jj+'</td><td class="numeric-cell">'+dif+'</td><td class="numeric-cell">'+puntos+'</td></tr></tbody>';
            cadenade_landscape  = cadenade_landscape + '<tbody class = "col-formato"><tr><td class="label-cell">'+equipo+'</td><td class="numeric-cell">'+jj+'</td><td class="numeric-cell">'+jg+'</td><td class="numeric-cell">'+je+'</td><td class="numeric-cell">'+jp+'</td><td class="numeric-cell">'+gf+'</td><td class="numeric-cell">'+ge+'</td><td class="numeric-cell">'+dif+'</td><td class="numeric-cell">'+puntos+'</td></tr></tbody>';
          }
          
        }
        cadenade            = cadenade + '</table>';
        cadenade_landscape  = cadenade_landscape + '</table>';
        $$('#show-tabla-general').append(cadenade);
        $$('#show-tabla-general-landscape').append(cadenade_landscape);
        callBack("OK");
    },
    ShowTablaGoleo:function(){
        if (global_functions.CheckNetConnection()){
            app7.preloader.show();
            app7.request({ /* PWA */
                url: 'http://futcho7.com.mx/MiScore/WebService/gettablagolnvaver.php',
                /*url: 'https://cedula.futcho7.com.mx/WebService/getrecords.php',*/
                data:{id_cliente:gcliente,id_sucursal:gsucursal,id_torneo:gidtorneo,id_jornada:gjornada},
                method: 'POST',
                crossDomain: true,
                success:function(data){
                    var objson = JSON.parse(data);
                    if (objson.status == 1){
                        show_info_functions.TablaGol(objson,function(f){
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
    TablaGol:function(objson,callBack){
        var tablagol    = objson['Datos'];
        var idequipo    = 0;
        var jugador     = "";
        var nomEquipo   = "";
        var goles       = 0;
        var bandera     = 0;
        var idjugador   = 0;
        var numplayera  = 0;
        $$('#lista-goleadores').html("");
        cadenaen = '<ul>';
        for (var i=0; i < tablagol.length; i++) {
          /* Se barren los jugadores goleadores */
          idequipo  = tablagol[i].id_equipo;
          jugador   = tablagol[i].jugador;
          nomEquipo = tablagol[i].equipo;
          goles     = tablagol[i].goles;
          idjugador = tablagol[i].id_jugador;
          numplayera= tablagol[i].jug_numero;
          /* Al llamado de la function getDatosJugador, se envian los datos de id_equipo,id_jugador y num.playera
             en el nombre del jugador, su id esta formado por nombre-jugador-idequipo-idjugador
             en el nombre del equipo, su id está formado por nombre-equipo-idequipo-idjugador
             los ultimos dos id's son usados para recuperar dichos datos(nombre jugador y nombre equipo
                y así mostrarlos en el detalle de goleo*/
          if(bandera == 0){
              cadenade  = cadenaen + '<li><a href="#" class="item-link item-content" onclick = "show_info_functions.getDatosJugador('+"'"+String(idequipo)+"-"+String(idjugador)+"/"+String(numplayera)+"'"+')"><div class="item-media"><i class="icon icon-custom-photo f7-icons">person_alt</i></div><div class="item-inner"><div class="item-title"><div id="nombre-jugador-'+String(idequipo)+'-'+String(idjugador)+'">'+jugador+'</div><div class="item-footer" id="nombre-equipo-'+String(idequipo)+'-'+String(idjugador)+'">'+nomEquipo+'</div></div><div class="item-after goles">'+String(goles)+'</div></div></a></li>';
              bandera   = 1;
          }else{
            cadenade = cadenade + '<li><a href="#" class="item-link item-content" onclick = "show_info_functions.getDatosJugador('+"'"+String(idequipo)+"-"+String(idjugador)+"/"+String(numplayera)+"'"+')"><div class="item-media"><i class="icon icon-custom-photo f7-icons">person_alt</i></div><div class="item-inner"><div class="item-title"><div id="nombre-jugador-'+String(idequipo)+'-'+String(idjugador)+'">'+jugador+'</div><div class="item-footer" id="nombre-equipo-'+String(idequipo)+'-'+String(idjugador)+'">'+nomEquipo+'</div></div><div class="item-after goles">'+String(goles)+'</div></div></a></li>';
          }
          
        }
        cadenade = cadenade + '</ul>';
        $$('#lista-goleadores').append(cadenade);
        callBack("OK");
    },
    getDatosJugador:function(EquipoJugador) {
        /* Al armar la cadena para mostrar la tabla de goleo, cada renglón es identificado por la cadena "id_equipo-id_jugador/num_playera", aquí se desglosa
           dicha cadena y se envía como parámetros al view detalle.goleo */
        var equipo  = parseInt(EquipoJugador.substring(0,EquipoJugador.indexOf("-")));
        var jugador = parseInt(EquipoJugador.substring(EquipoJugador.indexOf("-")+1),EquipoJugador.substring(0,EquipoJugador.indexOf("/")));
        var playera = parseInt(EquipoJugador.substring(EquipoJugador.indexOf("/")+1));
        /* Se busca los nombres de jugador y equipo, esto con la ayuda del id para cada rubro ya que son identificados como... nombre-jugador-id_equipo-id_jugador */
        var nomJugador = $$('#nombre-jugador-'+String(equipo)+'-'+String(jugador)).text();
        var nomEquipo  = $$('#nombre-equipo-'+String(equipo)+'-'+String(jugador)).text();
        mainView.router.navigate(`/detalle-goleo/${equipo}/${jugador}/${playera}/${nomJugador}/${nomEquipo}/`,{animate:true});
    },
}