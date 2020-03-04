var count = 0;
var row;

$(document).ready(function()
{
    url_base = "3.93.176.22";
    
    $("#show").ready(function(){
             Show();
             
    });

    $("#Add").click(function(){
        location.href = "AddCategory.html";
    });
    

}); 

document.onchange = function(){
    doSearch();
}

function Show() 
    {      
        $.ajax({
            url: url_base + "/api/category/asf",
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
            column.setAttribute("id","categoryName"+count);
            column.appendChild(text);
            //metemos la columna en la fila
            row.appendChild(column);

            //columna name
            var column = document.createElement('td');
            var text = document.createTextNode(user.photo);            
            column.setAttribute("value",user.photo);            
            column.setAttribute("id","categoryFoto"+count);
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
        
        var idName = 'categoryName'+ Editbutton.value;
        var idFoto = 'categoryFoto'+ Editbutton.value;

        user.name = document.getElementById(idName).innerText;
        user.photo = document.getElementById(idFoto).innerText;
        
        console.log(JSON.stringify(user));
        localStorage.setItem('user', JSON.stringify(user));
        location.href = "EditCategory.html";
    }

    function Delete(name) 
    {
        //console.log(email);
        var data_user = {
            "name":name,
        }
        return data_user;
    }

    function DeleteUser(buttonDelete) {
        
        var idColumnEmail = 'categoryName'+buttonDelete.value;
        console.log(idColumnEmail)
        var email = document.getElementById(idColumnEmail).innerText;
        //var email = $(idColumnEmail);

        console.log(email);
        var data = Delete(email);
        $.ajax({
            url: url_base + "/api/category/ef",
            type: 'DELETE',
            data: data,
            dataType: 'json',
            headers: {
                'Authentication': sessionStorage.getItem('token')
            },
            success: function(){
                //console.log("borrado");
                alert("Categoria borrada correctamente");
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