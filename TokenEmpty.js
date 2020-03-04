$(".logout").ready(function(){
    if(sessionStorage.getItem('token') == null){
        if(location.href == "http://localhost:8888/Rick/iFoodieWebApp/welcome.html") {
      location.href = "index.html";
    } else {
      location.href = "../index.html";
    }
    }  
  });