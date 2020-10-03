
var login = (function () {

    //Esta se cambia por la del heroku antes de desplegar 'http://localhost:8080'
    const urlAPI = 'http://localhost:8080';

    function doLogin() {
        var email = $("#username").val();
        var passw = $("#password").val();
        var loginRequest = {username: email, password: passw};
        apiclient.postLogin(loginRequest).then(function(data, textStatus, request) {
            var token = request.getResponseHeader('Authorization');
            apiclient.getIndex(token).then(function (){
                localStorage.setItem('Authorization',token);
                localStorage.setItem('username',email);
                //localStorage.setItem('password',passw);
                location.href = "index.html"
            })
        });
    }
    return {
        doLogin:doLogin
    };
})();