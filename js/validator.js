var validator = (function () {

    //http://localhost:8080
    //https://teache-me-front.herokuapp.com
    const urlAPI = "file:///C:/Users/nicol/Desktop/Teach-me-front";

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