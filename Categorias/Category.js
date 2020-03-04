$(document).ready(function()
{
    url_base = "3.93.176.22";

    $("#buttonBack").click(function(){
        goBack();
    });

    $("#button").click(function(){
        StoreUser();
    })
});   

    function get_user() 
    {
        var name = $('#name').val();

        var data_user = {
            "name": name,
        }
        return data_user;
    }

    function StoreUser() 
    {
        var data = get_user();
        $.ajax({
            url: url_base + "/api/category",
            type: 'POST',
            data: data,
            headers: {
                'Authentication': sessionStorage.getItem('token')
            },
            dataType: 'json',
            success: function(){
                location.href = "ShowCategories.html";             
            },

            error: function(response) {
                console.log(response)
                console.log("No se ha podido registrar al usuario"); 
                document.getElementById('errorC').style.display = 'block';         
            }
          });
    }

    function goBack (){
        location.href = "ShowCategories.html";
    }
