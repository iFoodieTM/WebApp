$(document).ready(function()
{
    url_base = "http://localhost:8888/Rick/iFoodieApi/public/index.php";

    $("#button").click(function(){
        login();
    });

    $("#show").ready(function(){
        login();
    });
});   

    function get_user() 
    {
        var name = $('#name').val();
        var email = $('#email').val();
        var user_name = $('#user_name').val();
        var password = $('#password').val();
        var photo = $('#photo').val();

        var data_user = {
            "name":name,
            "email":email,
            "user_name":user_name,
            "password":password,
            "photo":photo
        }
        return data_user;
    }

    function recover() 
    {
        var email = $('#email').val();

        var data_user = {
            "email":email,
        }
        return data_user;
    }

    function login() 
    {
        var data = get_user();
        
        $.ajax({
            url: url_base + "/api/register",
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function(response){
                console.log(response.token);
                sessionStorage.setItem('token', response.token);
                location.href = "welcome.html";
            },

            error: function() {
                    alert("la informacion es incorrecta");
                 }
          });
    }

    function login() 
    {
        var data = recover();
        
        $.ajax({
            url: url_base + "/api/recoverPassword",
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function(){
                location.href = "welcome.html";
            },

            error: function() {
                    alert("la informacion es incorrecta");
                 }
          });
    }

    function login() 
    {      
        $.ajax({
            url: url_base + "/api/users/{user}",
            type: 'GET',
            dataType: 'json',
            success: function(response){
                JSON.parse(response);
            },

            error: function() {
                    alert("la informacion es incorrecta");
                 }
          });
    }