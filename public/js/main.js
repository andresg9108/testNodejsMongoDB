$(function(){
    load();

    setInterval("load()", 60000);
});

function load(){
    var parameters = {};
    $.ajax({
        data:  parameters,
        url:   'http://localhost:3000/API/contact?request=select&action=all',
        type:  'get',
        beforeSend: function () {
            $("#data").html("Loading...");
        },
        success:  function (response) {
            if(response.transaction){
                var html = "";
                var cont = 1;
                $.each(response.respuesta,function (i,v){
                    var id = v._id;
                    html += cont+") <span>"+v.name+" "+v.lastname+"</span> - Edad: "+v.age+" Tel:"+v.phone;
                    var del = 'deleteContact("'+id+'")';
                    html += " <a href='#' onclick='"+del+"'>Eliminar</a>";
                    html += "<br />";
                    cont++;
                });
                $("#data").html(html);
                $("#nom").focus();
            }
        }
    });
}

function addContact(){
    if(validateAddContact()){
        var sName = $("#name").val();
        var sLastname = $("#lastname").val();
        var sPhone = $("#phone").val();
        var sAge = $("#age").val();

        $("#name").val("");
        $("#lastname").val("");
        $("#phone").val("");
        $("#age").val("");
        
        var parameters = {
            name: sName,
            lastname: sLastname,
            phone: sPhone,
            age: sAge
        };
        $.ajax({
            data:  parameters,
            url:   'http://localhost:3000/API/contact/?request=insert',
            type:  'post',
            beforeSend: function () {
            },
            success:  function (response) {
                load();
            }
        });
    }

    return false;
}

function deleteContact(id){
    var parameters = {
        id:id
    };
    $.ajax({
        data:  parameters,
        url:   'http://localhost:3000/API/contact?request=delete',
        type:  'post',
        beforeSend: function () {
        },
        success:  function (response) {
            load();
        }
    });
}

//
//
//
//
//

function validateAddContact(){
    if(!validateText("name","Add Name")){
        return false;
    }
    if(!validateText("lastname","Add Last Name")){
        return false;
    }
    if(!validateText("phone","Add Phone")){
        return false;
    }
    if(!validateText("age","Add Age")){
        return false;
    }
    return true;
}

function validateText(name, text){
    field = document.getElementById(name);
    if (field.value.replace(/^\s+/,'').replace(/\s+$/,'').length == 0) {
        field.focus();
        field.value = "";
        $("#"+name).css("background-color","yellow");
        $("#"+name).css("color","black");
        $("#e"+name).html(text);
        return false;
    }
    $("#e"+name).html("");
    return true;
}

function validateCombo(name, text){
    field = document.getElementById(name);
    if (field.selectedIndex == 0) {
        field.focus();
        $("#"+name).css("background-color","yellow");
        $("#"+name).css("color","black");
        $("#e"+name).html(text);
        return false;
    }
    $("#e"+name).html("");
    return true;
}