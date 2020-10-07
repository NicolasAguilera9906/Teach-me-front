var validator = (function () {

    //http://localhost:8080
    //https://teache-me-front.herokuapp.com
    const urlAPI = "https://teache-me-front.herokuapp.com";

    function redirect(message){
        location.href = urlAPI+"/authenticate.html";
    }

    function loadPage(){
        var token = localStorage.getItem("Authorization");
        apiclient.validatePage(token,redirect);
    }

    return {
        loadPage:loadPage
    };
});