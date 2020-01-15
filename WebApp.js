window.onload = cargar;

    function cargar(){
      document.getElementById("btn btn-default").onclick = register_user;
    } 

    function register_user(){
        var URL = "http://localhost:8888/Rick/Password/public/index.php/api/login";
        var email = document.getElementById("nombre").value;
        var password = document.getElementById("clave").value;
        var user_data = {'email':email, 'password':password};
console.log(user_data);
     $.ajax({
        url: URL,
        type: 'POST',
        data: user_data,
        datatype: 'json',
        success: function(response){
          alert(response.token);
          sessionStorage.setItem('token', response.token);
      }
      }).done(function(){
        alert("información correcta")
        console.log("5")
      });
    }