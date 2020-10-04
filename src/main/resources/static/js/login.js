
var login = (function () {

    //Esta se cambia por la del heroku antes de desplegar "http://localhost:8080"
    const urlAPI = "https://teache-me-front.herokuapp.com";

    function doLogin() {
        var email = $("#username").val();
        var passw = $("#password").val();
        var loginRequest = {username: email, password: passw};
        apiclient.postLogin(loginRequest).then(function(data, textStatus, request) {
            var token = request.getResponseHeader("Authorization");
            localStorage.setItem("Authorization",token);
            localStorage.setItem("username",email);
            location.href = urlAPI+"/index.html";
        });
    }
    return {
        doLogin:doLogin
    };
})();