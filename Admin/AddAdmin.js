$(document).ready(function()
{
    url_base = "http://34.204.47.162";

    $("#buttonBack").click(function(){
        goBack();
    });

    $("#button").click(function(){
        StoreUser();
    })
});   

    function get_user() 
    {
        var email = $('#email').val();
        var user_name = $('#user_name').val();
        var password = $('#password').val();
        var rol = $('#rol').val();

        var data_user = {
            "email":email,
            "user_name":user_name,
            "password":password,
            "rol":rol
        }
        return data_user;
    }

    function StoreUser() 
    {
        var data = get_user();

        var bandera = true;
        if ($('#email').val().length == 0) {
            document.getElementById('emptyE').style.display = 'block';
            bandera = false;
        } else {
            document.getElementById('emptyE').style.display = 'none';
        } 

        if(!validarEmail($('#email').val())) {
            bandera = false;
            document.getElementById('invalidE').style.display = 'block';
        }
        
        if ($('#user_name').val().length == 0) {
            document.getElementById('emptyU').style.display = 'block';
            bandera = false;
        } else {
            document.getElementById('emptyU').style.display = 'none';
        }

        if ($('#password').val().length == 0) {
            document.getElementById('emptyP').style.display = 'block';
            bandera = false;
        } else {
            document.getElementById('emptyP').style.display = 'none';
        }

        if(bandera) {
        $.ajax({
            url: url_base + "/api/store",
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function(){
                location.href = "ShowAdmin.html";             
            },

            error: function() {
                console.log("No se ha podido registrar al usuario");
                if(Response.status == 400){
                    document.getElementById('existE').style.display = 'block';
                } else {
                    document.getElementById('existE').style.display = 'none';
                }

                if(Response.status == 401) {
                    document.getElementById('existU').style.display = 'block';
                } else {
                    document.getElementById('existU').style.display = 'none';
                }          
            }
          });
        }
    }

    function validarEmail(valor) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(valor)){
         return false;
        } else {
         return true;
        }
      }

    function goBack (){
        location.href = "ShowAdmin.html";
    }
