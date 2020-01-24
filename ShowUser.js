$(document).ready(function()
{
    url_base = "http://localhost:8888/Rick/iFoodieApi/public/index.php";
    
    $("#show").ready(function(){
             Show();
    });
});   

function Show() 
    {      
        $.ajax({
            url: url_base + "/api/users/{user}",
            type: 'GET',
            dataType: 'json',
            success: function(response){
                //console.log(response);
                createTable(response);
            },

            error: function() {
                    alert("la informacion es incorrecta");
                 }
          });
    }

    function createTable(response){
        var count = 0;
        response.Success.forEach(user => {
            console.log(user);
            //creamos la fila
            var row = document.createElement("tr");

            //creamos la columna
            //columna id
            var column = document.createElement('td');
            var text = document.createTextNode(user.id);            
            column.setAttribute("value","userId");            
            column.setAttribute("id","userId"+count);
            column.appendChild(text);
            //metemos la columna en la fila
            row.appendChild(column);

            //columna name
            var column = document.createElement('td');
            var text = document.createTextNode(user.name);            
            column.setAttribute("value","userName");            
            column.setAttribute("id","userName"+count);
            column.appendChild(text);
            //metemos la columna en la fila
            row.appendChild(column);

            //columna user name
            var column = document.createElement('td');
            var text = document.createTextNode(user.user_name);            
            column.setAttribute("value","userUserName");            
            column.setAttribute("id","userUserName"+count);
            column.appendChild(text);
            //metemos la columna en la fila
            row.appendChild(column);

            //columna email
            var column = document.createElement('td');
            var text = document.createTextNode(user.email);            
            column.setAttribute("value","userEmail");            
            column.setAttribute("id","userEmail"+count);
            column.appendChild(text);
            //metemos la columna en la fila
            row.appendChild(column);

            //columna photo
            var column = document.createElement('td');
            var text = document.createTextNode(user.photo);            
            column.setAttribute("value","userPhoto");            
            column.setAttribute("id","userPhoto"+count);
            column.appendChild(text);
            //metemos la columna en la fila
            row.appendChild(column);


            //metemos la fila en la tabla
            document.getElementById("userTable").appendChild(row);
            count++;
        });
    }