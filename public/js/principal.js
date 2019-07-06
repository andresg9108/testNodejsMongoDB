$(document).ready(function(){
    buscar_usuarios();

    setInterval("buscar_usuarios()",60000);
});

function buscar_usuarios(){
    var parametros = {};
    $.ajax({
        data:  parametros,
        url:   'http://localhost:3000/API/contact?request=select&action=all',
        type:  'get',
        beforeSend: function () {
            $("#datos").html("Procesando...");
        },
        success:  function (response) {
            if(response.transaction){
                var html = "";
                var cont = 1;
                $.each(response.respuesta,function (i,v){
                    var id = v._id;
                    html += cont+") <span>"+v.name+" "+v.lastname+"</span> - Edad: "+v.age+" Tel:"+v.phone;
                    var del = 'eliminar_usuarios("'+id+'")';
                    html += " <a href='#' onclick='"+del+"'>Eliminar</a>";
                    html += "<br />";
                    cont++;
                });
                $("#datos").html(html);
                $("#nom").focus();
            }
        }
    });
}

function agregar_usuario(){
    if(validar_add_usuario()){
        var nom = $("#nom").val();
        var ape = $("#ape").val();
        var tel = $("#tel").val();
        var ed = $("#ed").val();
        $("#nom").val("");
        $("#ape").val("");
        $("#tel").val("");
        $("#ed").val("");
        var parametros = {
            nom:nom,
            ape:ape,
            tel:tel,
            ed:ed
        };
        $.ajax({
            data:  parametros,
            url:   'http://localhost:3000/API/contact/?request=insert',
            type:  'post',
            beforeSend: function () {
            },
            success:  function (response) {
                buscar_usuarios();
            }
        });
    }

    return false;
}

function eliminar_usuarios(id){
    var parametros = {
        id:id
    };
    $.ajax({
        data:  parametros,
        url:   'http://localhost:3000/API/contact?request=delete',
        type:  'post',
        beforeSend: function () {
        },
        success:  function (response) {
            buscar_usuarios();
        }
    });
}

//
//
//
//
//

/*Funciones adicionales*/
function validar_add_usuario(){
    if(!validar_texto("nom","Add Nombre")){
        return false;
    }
    if(!validar_texto("ape","Add Apellido")){
        return false;
    }
    if(!validar_texto("tel","Add Telefono")){
        return false;
    }
    if(!validar_texto("ed","Add Edad")){
        return false;
    }
    return true;
}

/*VALIDAR CAMPOS DE TEXTO*/
function validar_texto(nombre,texto){
    campo = document.getElementById(nombre);
    if (campo.value.replace(/^\s+/,'').replace(/\s+$/,'').length == 0) {
        campo.focus();
        campo.value = "";
        $("#"+nombre).css("background-color","yellow");
        $("#"+nombre).css("color","black");
        $("#e"+nombre).html(texto);
        return false;
    }
    $("#e"+nombre).html("");
    return true;
}

/*VALIDAR COMBOBOX*/
function validar_combo(nombre,texto){
    campo = document.getElementById(nombre);
    if (campo.selectedIndex == 0) {
        campo.focus();
        $("#"+nombre).css("background-color","yellow");
        $("#"+nombre).css("color","black");
        $("#e"+nombre).html(texto);
        return false;
    }
    $("#e"+nombre).html("");
    return true;
}