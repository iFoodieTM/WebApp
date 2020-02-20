$(".logout").ready(function(){
    if(sessionStorage.getItem('token') == null){
        if(location.href == "http://localhost:8888/Victor/WebAppiFoodie/welcome.html") {
      location.href = "index.html";
    } else {
      location.href = "../index.html";
    }
    }  
  });