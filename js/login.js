

var login = (function () {


    /*
       LOCAL
       http://localhost:63342/Teach-me-front
     */
    const urlAPI = " https://teache-me-front.herokuapp.com";


    //var apiclient = apiclient;

    function doLogin() {
        var email = $("#username").val();
        var passw = $("#password").val();
        var loginRequest = {username: email, password: passw};
        //$.getScript(apiclient,function(){
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
        //})
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