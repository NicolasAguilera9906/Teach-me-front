var validator = (function () {

    //http://localhost:8080
    //https://teache-me-front.herokuapp.com

    var _login = login;

    const urlAPI = "https://teache-me-front.herokuapp.com";

    function redirect(){
        _login.doLogout();
    }

    function loadPage(){
        var token = localStorage.getItem("Authorization");
        apiclient.validatePage(token,redirect);
    }

    return {
        loadPage:loadPage
    };
});