var count = 0;
var row;

$(document).ready(function()
{
    url_base = "http://localhost:8888/APIiFoodie/public/index.php";
    
    $("#show").ready(function(){
             Show();
             
    });

    $("#Add").click(function(){
        location.href = "AddUser.html";
    })
    

}); 

document.onchange = function(){
    doSearch();
}

function Show() 
    {      
        $.ajax({
            url: url_base + "/api/users/asd",
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
            column.setAttribute("value",user.id);            
            column.setAttribute("id","userId"+count);
            column.appendChild(text);
            //metemos la columna en la fila
            row.appendChild(column);

            //columna name
            var column = document.createElement('td');
            var text = document.createTextNode(user.name);            
            column.setAttribute("value",user.name);            
            column.setAttribute("id","userName"+count);
            column.appendChild(text);
            //metemos la columna en la fila
            row.appendChild(column);

            //columna user name
            var column = document.createElement('td');
            var text = document.createTextNode(user.user_name);            
            column.setAttribute("value",user.user_name);            
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
             var text = document.createTextNode(user.rol);            
             column.setAttribute("value",user.rol);            
             column.setAttribute("id","userRol"+count);
             column.appendChild(text);
             //metemos la columna en la fila
             row.appendChild(column);

            //columna photo
            var column = document.createElement('td');
            var text = document.createTextNode(user.photo);            
            column.setAttribute("value",user.photo);            
            column.setAttribute("id","userPhoto"+count);
            column.appendChild(text);
            //metemos la columna en la fila
            row.appendChild(column);

            var column = document.createElement('td');
             var text = document.createTextNode(user.banned);            
             column.setAttribute("value",user.banned);            
             column.setAttribute("id","userBan"+count);
             column.appendChild(text);
             //metemos la columna en la fila
             row.appendChild(column);

            var column2 = document.createElement("button")
                //column2.innerHTML = "Editar";
                column2.setAttribute("id", "ButtonEdit");
                column2.setAttribute("type", "button");
                column2.setAttribute("value", count);
                column2.setAttribute("class", "EditId" + count);
                column2.setAttribute('onclick', 'EditUser(this)');

            var column4 = document.createElement("button")
                //column2.innerHTML = "Editar";
                column4.setAttribute("id", "ButtonBanned");
                column4.setAttribute("type", "button");
                column4.setAttribute("value", count);
                column4.setAttribute("class", "BannedId" + count);
                column4.setAttribute('onclick', 'BanUser(this)');  
                if(user.banned == 0) {
                    column4.style.backgroundImage = 'url(../Fotos/ban.png)';
                }  else {
                    column4.style.backgroundImage = 'url(../Fotos/unban.png)';
                }

            var column3 = document.createElement("button")
                //column3.innerHTML = "Eliminar";
                column3.setAttribute("type", "button");
                column3.setAttribute("id", "ButtonDelete");
                column3.setAttribute("value", count);
                column3.setAttribute("class", "DeleteId" + count);
                column3.setAttribute('onclick', 'DeleteUser(this)'); 

        
            //metemos la fila en la tabla
            document.getElementById("userTable").appendChild(row);
            row.appendChild(column2);
            row.appendChild(column4);
            row.appendChild(column3);
            count++;

           // column3.onclick = function () {
           //     var id = this.parentNode.rowIdex;
            //    var rowSelected = document.getElementById('#userEmail')[id];
            //    alert(rowSelected.row.innerHTML);
           // }
        });
    }

    function EditUser (Editbutton) {

        var user = new Object();
        
        var idName = 'userName'+ Editbutton.value;
        var idUser_name = 'userUserName' + Editbutton.value;
        var idEmail = 'userEmail' + Editbutton.value;
        var idPhoto = 'userPhoto' + Editbutton.value;

        user.name = document.getElementById(idName).innerText;
        user.username = document.getElementById(idUser_name).innerText;
        user.email = document.getElementById(idEmail).innerText;
        user.photo = document.getElementById(idPhoto).innerText;
        
        console.log(JSON.stringify(user));
        localStorage.setItem('user', JSON.stringify(user));
        location.href = "EditUser.html";
    }

    function Delete(email) 
    {
        //console.log(email);
        var data_user = {
            "email":email,
        }
        return data_user;
    }

    function DeleteUser(buttonDelete) {
        
        var idColumnEmail = 'userEmail'+buttonDelete.value;
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

    function BanUser(ButtonBanned) {
        
        var idColumnEmail = 'userEmail'+ButtonBanned.value;
        console.log(idColumnEmail)
        var email = document.getElementById(idColumnEmail).innerText;
        var idBan = 'userBan'+ButtonBanned.value;
        var ban = document.getElementById(idBan).innerText;
        //var email = $(idColumnEmail);
        if (ban == 0) {
            var urlEnd = "/api/ban";
        } else {
            var urlEnd = "/api/unban";
        }

        //console.log(email);
        var data = Delete(email);
        $.ajax({
            url: url_base + urlEnd,
            type: 'POST',
            data: data,
            dataType: 'json',
            headers: {
                'Authentication': sessionStorage.getItem('token')
            },
            success: function(){
                //console.log("borrado");
                location.reload();
            },

            error: function() {
                    alert("Algo ha ido mal");
                 }
          });
    }


    function doSearch() {
        var tableReg = document.getElementById('table');
        var searchText = document.getElementById('searchTerm').value.toLowerCase();
        for (var i = 1; i < tableReg.rows.length; i++) {
            var cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
            var found = false;
            for (var j = 0; j < cellsOfRow.length && !found; j++) {
                var compareWith = cellsOfRow[j].innerHTML.toLowerCase();
                if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1)) {
                    found = true;
                }
            }
            if (found) {
                tableReg.rows[i].style.display = '';
            } else {
                tableReg.rows[i].style.display = 'none';
            }
        }
    }