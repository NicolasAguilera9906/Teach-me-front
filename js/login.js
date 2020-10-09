
var login = (function () {

    //Esta se cambia por la del heroku antes de desplegar "http://localhost:8080"
    // https://teache-me-front.herokuapp.com
    // nicolas : file:///C:/Users/nicol/Desktop/

    const urlAPI = "https://teache-me-front.herokuapp.com";

    function doLogin() {
        var email = $("#username").val();
        var passw = $("#password").val();
        var loginRequest = {username: email, password: passw};
        apiclient.postLogin(loginRequest)
            .then(function(data, textStatus, request) {
                var token = request.getResponseHeader("Authorization");
                localStorage.setItem("Authorization",token);
                localStorage.setItem("username",email);
                location.href = urlAPI+"/index.html";
            }).catch( (e) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Usuario o contraseña incorrectos"
                });
        });
    }
    function doLogout(){
        localStorage.clear();
        window.location.href=urlAPI+"/authenticate.html"
    }
    return {
        doLogin:doLogin,
        doLogout:doLogout
    };
})();