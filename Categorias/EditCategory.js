$(document).ready(function()
{
    url_base = "http://3.93.176.22";
    
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
   document.getElementById("photo").file = obj.photo;
}

function getUpdate() {
    var new_name = $('#name').val();
    var user =  localStorage.getItem('user');
    var obj = JSON.parse(user);
    console.log(obj.name);
    var name = obj.name;

    var data_user = {
        "new_name":new_name,
        "name": name
    }

    return data_user
}

function UpdateUser() 
    {
        var data = getUpdate();
        $.ajax({
            url: url_base + "/api/category/wef",
            type: 'PUT',
            data: data,
            dataType: 'json',
            headers: {
                'Authentication': sessionStorage.getItem('token')
            },
            success: function(){
                console.log(data);
                location.href = "ShowCategories.html";             
            },

            error: function() {
                console.log("mal");          
            }
          });
    }

function goBack (){
    location.href = "ShowCategories.html";
}