$(document).ready(function()
{
    url_base = "http://localhost:8888/Victor/ApiiFoodie/public/index.php";

    $("#Users").ready(function(){
        Show();   
    });

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
                    console.log(response.rol);
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

    function Show() 
    {     
        $.ajax({
            url: url_base + "/api/users/wef",
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authentication': sessionStorage.getItem('token')
            },
            
            success: function(response){
                var users = 0;
                var rest = 0;
                var admin = 0;
                var hoy = new Date();
                var Fhoy = hoy.getUTCFullYear() + "/" + (hoy.getMonth()+1) + "/" + hoy.getDate();
                var Uhoy = 0;
                console.log(response.Success.length);

                response.Success.forEach(user => {
                    if(user.rol == 1) {
                        users ++;
                        var Userfecha = new Date();
                        Uhoy = user.created_at ;
                        //var U = Uhoy.;
                        
                        console.log(Uhoy);

                    } else if (user.rol == 2) {
                        rest ++;
                    } else if (user.rol == 3) {
                        admin ++;
                    }
                });
                var PorcentajeUsers = (users * 100)/response.Success.length;
                document.getElementById("PorU").innerText = PorcentajeUsers;
                document.getElementById("Users").innerText = users;

                var PorcentajeRest = (rest * 100)/ response.Success.length;
                document.getElementById("PorR").innerText = PorcentajeRest;
                document.getElementById("Rest").innerText = rest;

                var PorcentajeAdmin = (admin * 100)/ response.Success.length;
                document.getElementById("PorA").innerText = PorcentajeAdmin;
                document.getElementById("Adm").innerText = admin;

                
                
            },

            error: function(response) {
                    alert("la informacion es incorrecta");
                    console.log(response)
                 }
          });
    }