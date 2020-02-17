$(document).ready(function()
{
    url_base = "http://localhost:8888/Victor/ApiiFoodie/public/index.php";

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
            }
          });
    }

    function goBack (){
        location.href = "ShowAdmin.html";
    }
