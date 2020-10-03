var validator = (function () {

    function loadPage(){
        var token = localStorage.getItem('Authorization');
        if(token==null || token=='null'){
            //alert("Debe loguearse");
            location.href = "authenticate.html";
        }
    }
    return {
        loadPage:loadPage
    };
});