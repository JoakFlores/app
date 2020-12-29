var settings ={
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
                /* En caso de que la cuenta cambió, se borran todos los registros de la BD */
                DeleteTables();
                /* La cuenta, se divide por el valor correspondiente a cliente/sucursal */
                var cliente = Number(cuentastring.substring(0,2));
                var sucursal= Number(cuentastring.substring(2,4));
    
                app7.request({ /* PWA */   
                    /*url: 'http://futcho7.com.mx/Cedula/WebService/configcuenta.php',*/
                    url: 'https://cedula.futcho7.com.mx/WebService/configcuenta.php',
                    data:{id_cliente:cliente,id_sucursal:sucursal},
                    method: 'POST',
                    crossDomain: true,
                    success:function(data){
                        app7.preloader.hide();
                        var objson = JSON.parse(data);
                        if (objson.mensaje == "EXITOSO"){
                            /* Se asignan a variables los valores correspondientes al nombre del cliente y sucursal */
                            /* Se almacenan en variables nombre del cliente y de la sucursal */
                            var nomCliente  = objson.datos[0].cli_nombre;
                            var nomSucursal = objson.datos[0].suc_nombre;
                            var cliLogo     = objson.datos[0].cli_logo;
                            /* Se almacenan en localStorage: cuenta,nombre de cliente, nombre de sucursal, minutos y periodos */
                            localStorage.setItem("cuenta",cuentastring);
                            localStorage.setItem("nomCliente",nomCliente);
                            localStorage.setItem("nomSucursal",nomSucursal);
                            localStorage.setItem("minutos",minutos);
                            localStorage.setItem("periodos",periodos);
                            localStorage.setItem("logotipo",cliLogo);
        
                
                            app7.dialog.alert(nomCliente+" sede: "+nomSucursal+", la configuración fue exitosa", "AVISO");
                            }else{
                                app7.dialog.alert("La cuenta no existe, revise si hay un error, caso contrario... favor de reportarlo en la oficina de la cancha", "AVISO");
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
                /* No cambió la cuenta, solo se actualizan los valores de minutos,periodos en los localStorage, los cuales no contiene error */
                localStorage.setItem("minutos",minutos);
                localStorage.setItem("periodos",periodos);
                app7.dialog.alert("Actualización exitosa", "AVISO");
            }
        }
    }
}