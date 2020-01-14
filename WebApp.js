window.onload = cargar;

    function cargar(){
        document.getElementById("btn").onclick = register_user;
    } 

    function register_user(){
        var URL = "http://localhost:8888/Victor/APILibrary-master/public/index.php/api/storeUser";
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var user_data = {'email':email, 'password':password};

     $.ajax(URL,{
        type: "POST",
        data: user_data,
      }).done(function(){
        alert("información correcta")
      });
    }