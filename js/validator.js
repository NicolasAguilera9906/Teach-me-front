var validator = (function () {

    function redirect(message){
        location.href = "authenticate.html";
    }

    function loadPage(){
        var token = localStorage.getItem("Authorization");
        apiclient.validatePage(token,redirect);
    }

    return {
        loadPage:loadPage
    };
});