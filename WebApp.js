$(document).ready(function()
{
    url_base = "http://3.93.176.22";

    $("#Users").ready(function(){
        console.log('users');
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
        console.log(url_base + "/api/login_admin");
        $.ajax({
            url: url_base + "/api/login_admin",
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function(response){
                sessionStorage.setItem('token', response.token);
                location.href = "welcome.html";          
            },

            error: function(Response) {
                if ($('#email').val().length == 0 && $('#password').val().length != 0) {
                    document.getElementById('empty').style.display = 'block';
                    document.getElementById('emptyP').style.display = 'none';
                }
                
                if ($('#password').val().length == 0 && $('#email').val().length != 0){
                    document.getElementById('emptyP').style.display = 'block';
                    document.getElementById('empty').style.display = 'none';
                }
                
                if($('#password').val().length == 0 && $('#email').val().length == 0) {
                    document.getElementById('emptyP').style.display = 'block';
                    document.getElementById('empty').style.display = 'block';
                }
                
                if ($('#email').val().length != 0 && $('#password').val().length != 0 && Response.status == 401) {
                    document.getElementById('authorized').style.display = 'block';
                    document.getElementById('emptyP').style.display = 'none';
                    document.getElementById('empty').style.display = 'none';
                }
            }
          });
    }

    function Show() 
    {     
        console.log(url_base + "/api/login_admin");
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
                if ((hoy.getMonth()+1) < 10) {
                    var Fhoy = hoy.getUTCFullYear() + "-" + "0" + (hoy.getMonth()+1) + "-" + hoy.getDate();
                } else {
                    var Fhoy = hoy.getUTCFullYear() + "-" + (hoy.getMonth()+1) + "-" + hoy.getDate();
                }
                
                var Uhoy = 0;
                var Rhoy = 0;
                var Ahoy = 0;
                var UsT = 0;
                var RsT = 0;
                var AsT = 0;
                var UserB = 0;
                var RestB = 0;
                var AdminB = 0;
                console.log(response);

                response.forEach(user => {
                    if(user.rol == 1) {
                        users ++;
                        Uhoy = user.created_at ;
                        var Userfecha = Uhoy.split(' ').splice(0, 1).join(' ');

                        console.log(Fhoy);
                        console.log(Userfecha);

                        if(Fhoy == Userfecha) {
                            UsT ++;
                            console.log(UsT);
                        }
                        console.log(user.banned);
                        if (user.banned == 1) {
                            UserB ++;
                        }

                    } else if (user.rol == 2) {
                        rest ++;
                        Rhoy = user.created_at;
                        var RestFecha = Rhoy.split(' ').splice(0, 1).join(' ');

                        if (Fhoy == RestFecha) {
                            RsT ++;
                        }

                        if (user.banned == 1) {
                            RestB ++;
                        }
                    } else if (user.rol == 3) {
                        admin ++;
                        Ahoy = user.created_at;
                        var AdminFecha =  Ahoy.split(' ').splice(0, 1).join(' ');

                        if (Fhoy == AdminFecha) {
                            AsT ++;
                        }

                        if (user.banned == 1) {
                            AdminB ++;
                        }
                    }
                });
                var PorcentajeUsers = (users * 100)/response.length;
                var Porcetanje1 = PorcentajeUsers.toFixed(3);
                document.getElementById("PorU").innerText = Porcetanje1;
                document.getElementById("Users").innerText = users;
                document.getElementById("CreatedU").innerText = UsT;
                document.getElementById("BanU").innerText = UserB;

                var PorcentajeRest = (rest * 100)/ response.length;
                var Porcetanje2 = PorcentajeRest.toFixed(1);
                document.getElementById("PorR").innerText = Porcetanje2;
                document.getElementById("Rest").innerText = rest;
                document.getElementById("CreatedR").innerText = RsT;
                document.getElementById("BanR").innerText = RestB;

                var PorcentajeAdmin = (admin * 100)/ response.length;
                var Porcetanje3 = PorcentajeAdmin.toFixed(3);
                document.getElementById("PorA").innerText = Porcetanje3;
                document.getElementById("Adm").innerText = admin;
                document.getElementById("CreatedA").innerText = AsT;
                document.getElementById("BanA").innerText = AdminB;

                
                
            },

            error: function(response) {
                    alert("la informacion es incorrecta");
                    console.log(response)
                 }
          });
    }