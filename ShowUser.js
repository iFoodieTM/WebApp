var count = 0;
var row;

$(document).ready(function()
{
    url_base = "http://localhost:8888/Victor/ApiiFoodie/public/index.php";
    
    $("#show").ready(function(){
             Show();
    });
});   

function Show() 
    {      
        $.ajax({
            url: url_base + "/api/show",
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authentication': sessionStorage.getItem('token')
            },
            
            success: function(response){
                //console.log(response);
                createTable(response);
            },

            error: function(response) {
                    alert("la informacion es incorrecta");
                    console.log(response)
                 }
          });
    }

    function createTable(response){
  
        response.Success.forEach(user => {
            console.log(user);
            //creamos la fila
            row = document.createElement("tr")

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
            column.setAttribute("value",user.email);            
            column.setAttribute("id","userEmail" + count);
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

            var column2 = document.createElement("button")
                column2.innerHTML = "Editar";
                column2.setAttribute("type", "button");
                column2.setAttribute("id", "EditId" + count);
                column2.setAttribute('onclick', 'EditUser()');

            var column3 = document.createElement("button")
                column3.innerHTML = "Eliminar";
                column3.setAttribute("type", "button");
                column3.setAttribute("value", "userEmail" + count)
                column3.setAttribute("class", "DeleteId" + count);
                column3.setAttribute('onclick', 'DeleteUser(this)');    
        
            //metemos la fila en la tabla
            document.getElementById("userTable").appendChild(row);
            row.appendChild(column2);
            row.appendChild(column3);
            count++;

           // column3.onclick = function () {
           //     var id = this.parentNode.rowIdex;
            //    var rowSelected = document.getElementById('#userEmail')[id];
            //    alert(rowSelected.row.innerHTML);
           // }
        });
    }

    function EditUser () {
        location.href = "AddUser.html";
    }

    function Delete(email) 
    {
        
        
        //var email = alert($(this).closest('#fila').find('#userEmail').innerHTML);
        
        console.log(email);
        var data_user = {
            "email":email,
        }
        return data_user;
    }

    function DeleteUser(buttonDelete) {
        
        var idColumnEmail = ''+buttonDelete.value;
        console.log(idColumnEmail)
        var email = document.getElementById(idColumnEmail).innerText;
        //var email = $(idColumnEmail);

        console.log(email);
        var data = Delete(email);
        $.ajax({
            url: url_base + "/api/delete",
            type: 'DELETE',
            data: data,
            dataType: 'json',
            headers: {
                'Authentication': sessionStorage.getItem('token')
            },
            success: function(){
                //console.log("borrado");
                alert("Usuario borrado correctamente");
                location.reload();
            },

            error: function() {
                    alert("Algo ha ido mal");
                 }
          });
    }