$(document).ready(function()
{
    url_base = "http://localhost:8888/Rick/clase-laravel/public/index.php";

    $("#button").click(function(){
      //e.preventDefault();
        login();
    });
});
// window.onload = cargar;

//     function cargar() 
//     {
//         document.getElementById("btn").onclick = register;
//     }
    

    function get_user() 
    {
        var email = $('#email').val();
        var password = $('#password').val();

        var data_user = {
            "email":email,
            "password":password
        }
        return data_user;
    }

    function login() 
    {
        var data = get_user();
        
        $.ajax({
            url: url_base + "/api/login",
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