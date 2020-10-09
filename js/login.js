

var login = (function () {


    //Esta se cambia por la del heroku antes de desplegar "http://localhost:8080"
    // https://teache-me-front.herokuapp.com
    /*
       LOCAL
       http://localhost:63342/Teach-me-front
     */


    const urlAPI = "https://teache-me-front.herokuapp.com";


    let _apiclient = urlAPI+"/js/apiclient.js";

    function doLogin() {
        var email = $("#username").val();
        var passw = $("#password").val();
        var loginRequest = {username: email, password: passw};
        $.getScript(_apiclient,function(){
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
        })
    }
    function doLogout(){
        localStorage.clear();
        window.location.href=urlAPI+"/authenticate.html";
    }
    return {
        doLogin:doLogin,
        doLogout:doLogout
    };
})();