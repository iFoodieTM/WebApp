var count = 0;
var row;

$(document).ready(function()
{
    url_base = "http://34.204.47.162";
    
    $("#show").ready(function(){
             Show();
             
    });  

}); 

document.onchange = function(){
    doSearch();
}

function Show() 
    {      
        $.ajax({
            url: url_base + "/api/showAll",
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
                    console.log(response);
                 }
          });
    }

    function createTable(response){
  
        response.forEach(user => {
            console.log(user);
            //creamos la fila
            row = document.createElement("tr")

            //creamos la columna
            //columna id
            var column = document.createElement('td');
            var text = document.createTextNode(user.name);            
            column.setAttribute("value",user.name);            
            column.setAttribute("id","userId"+count);
            column.appendChild(text);
            //metemos la columna en la fila
            row.appendChild(column);

            //columna name
            var column = document.createElement('td');
            var text = document.createTextNode(user.time);            
            column.setAttribute("value",user.time);            
            column.setAttribute("id","userName"+count);
            column.appendChild(text);
            //metemos la columna en la fila
            row.appendChild(column);

            //columna user name
            var column = document.createElement('td');
            var text = document.createTextNode(user.rating);            
            column.setAttribute("value",user.rating);            
            column.setAttribute("id","userUserName"+count);
            column.appendChild(text);
            //metemos la columna en la fila
            row.appendChild(column);

            //columna email
            var column = document.createElement('td');
            var text = document.createTextNode(user.difficulty);           
            column.setAttribute("value",user.difficulty);            
            column.setAttribute("id","userEmail" + count);
            column.appendChild(text);
            //metemos la columna en la fila
            row.appendChild(column);

             //columna photo
             var column = document.createElement('td');
             var text = document.createTextNode(user.video);            
             column.setAttribute("value",user.video);            
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
            var text = document.createTextNode(user.description);            
            column.setAttribute("value",user.description);            
            column.setAttribute("id","userMenu"+count);
            column.appendChild(text);
            //metemos la columna en la fila
            row.appendChild(column);

            var column = document.createElement('td');
            var text = document.createTextNode(user.user_id);            
            column.setAttribute("value",user.user_id);            
            column.setAttribute("id","userDescription"+count);
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

            var column3 = document.createElement("button")
                //column3.innerHTML = "Eliminar";
                column3.setAttribute("type", "button");
                column3.setAttribute("id", "ButtonDelete");
                column3.setAttribute("value", count);
                column3.setAttribute("class", "DeleteId" + count);
                column3.setAttribute('onclick', 'DeleteUser(this)'); 

        
            //metemos la fila en la tabla
            document.getElementById("userTable").appendChild(row);
            row.appendChild(column3);
            count++;

           // column3.onclick = function () {
           //     var id = this.parentNode.rowIdex;
            //    var rowSelected = document.getElementById('#userEmail')[id];
            //    alert(rowSelected.row.innerHTML);
           // }
        });
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