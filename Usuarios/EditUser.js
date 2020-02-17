$(document).ready(function()
{
    url_base = "http://localhost:8888/Victor/ApiiFoodie/public/index.php";
    
    $("#show").ready(function(){
             getUser();
    });  

    $("#button").click(function(){
        UpdateUser();
    });

    $("#buttonBack").click(function(){
        goBack();
    });

}); 

function getUser () {
    /*
    var user =  localStorage.getItem('user');
    var token = sessionStorage.getItem('token');
    console.log(user);
    */

   var user =  localStorage.getItem('user');
   var obj = JSON.parse(user);
   console.log(obj.name);
   document.getElementById("name").value = obj.name;
   document.getElementById("user_name").value = obj.username;
   document.getElementById("email").value = obj.email;
   document.getElementById("photo").file = obj.photo;
}

function getUpdate() {
    var email = $('#email').val();
    var name = $('#name').val();
    var userName = $('#user_name').val();
    var rol = $('#rol').val();
    

    var data_user = {
        "name":name,
        "user_name":userName,
        "email": email
    }

    return data_user
}

function UpdateUser() 
    {
        var data = getUpdate();
        $.ajax({
            url: url_base + "/api/update",
            type: 'PUT',
            data: data,
            dataType: 'json',
            headers: {
                'Authentication': sessionStorage.getItem('token')
            },
            success: function(){
                location.href = "ShowUser.html";             
            },

            error: function() {
                console.log("mal");          
            }
          });
    }

function goBack (){
    location.href = "ShowUser.html";
}