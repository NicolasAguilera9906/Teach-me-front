var validator = (function () {

    //http://localhost:8080
    //https://teache-me-front.herokuapp.com

    let apiclient = "js/apiclient.js";


    const urlAPI = "https://teache-me-front.herokuapp.com";

    function redirect(){
        login.doLogout();
    }

    function loadPage(){
        var token = localStorage.getItem("Authorization");
        apiclient.validatePage(token,redirect);
    }

    return {
        loadPage:loadPage
    };
});