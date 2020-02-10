$(document).ready(function()
{
    url_base = "http://localhost:8888/Victor/ApiiFoodie/public/index.php";

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
                if (response.rol == 3) {
                sessionStorage.setItem('token', response.token);
                location.href = "welcome.html";
                } else {
                    document.getElementById('authorized').style.display = 'block';
                    document.getElementById('emptyP').style.display = 'none';
                    document.getElementById('empty').style.display = 'none';
                }
                
            },

            error: function() {
                if ($('#email').val().length == 0) {
                    document.getElementById('empty').style.display = 'block';
                }
                
                if ($('#password').val().length == 0){
                    document.getElementById('emptyP').style.display = 'block';
                } 
                if($('#email').val().length != 0 && $('#password').val().length != 0) {
                    document.getElementById('emptyP').style.display = 'none';
                    document.getElementById('empty').style.display = 'none';
                    document.getElementById('authorized').style.display = 'none';
                    alert("El email o la contraseña son incorrectos");
                }             
            }
          });
    }