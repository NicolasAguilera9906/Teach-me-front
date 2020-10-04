var validator = (function () {

    function loadPage(){
        var token = localStorage.getItem('Authorization');
        apiclient.validatePage(token,redirect);
    }
    function redirect(message){
        location.href = "authenticate.html";
    }
    return {
        loadPage:loadPage
    };
});