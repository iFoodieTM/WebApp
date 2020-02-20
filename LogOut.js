$(".logout").click(function(){
    sessionStorage.removeItem('token');
    console.log(location.href);
    if(location.href == "http://localhost:8888/Victor/WebAppiFoodie/welcome.html") {
      location.href = "index.html";
    } else {
      location.href = "../index.html";
    }
    
  });