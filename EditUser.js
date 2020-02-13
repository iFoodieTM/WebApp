$(document).ready(function()
{
    url_base = "http://localhost:8888/Victor/ApiiFoodie/public/index.php";
    
    $("#show").ready(function(){
             getUser();
    });  

}); 

function getUser () {
    var user =  localStorage.getItem('user');
    var token = sessionStorage.getItem('token');
    console.log(user);
}