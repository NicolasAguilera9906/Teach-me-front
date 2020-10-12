var validator = (function () {

    /*
       LOCAL
       http://localhost:63342/Teach-me-front
       https://teache-me-front.herokuapp.com
     */
    const urlAPI = "http://localhost:63342/Teach-me-front";

    let _apiclient = urlAPI+"/js/apiclient.js";
    
    function redirect(){
        login.doLogout();
    }

    function loadPage(){
        var token = localStorage.getItem("Authorization");
        $.getScript(_apiclient,function(){
            apiclient.validatePage(token,redirect);
        });
    }

    return {
        loadPage:loadPage
    };
});