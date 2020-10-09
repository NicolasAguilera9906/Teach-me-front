var ModuleSignup = (function () {

    var _Swal = Swal;
    var _apiclient=apiclient;

    function alertError(message){
        _Swal.fire({
            icon: "error",
            title: "Oops...",
            text: message
        });
    }

    /*eslint complexity: ["error", 5]*/

    function validate(email,firstName,lastName,password){
        var bool = true;
        if (firstName=="") {
            bool = false;
            alertError("The name cannot be empty");
        }else if (lastName==""){
            bool = false;
            alertError("The last name cannot be empty");
        }else if (password==""){
            bool = false;
            alertError("The password cannot be empty");
        }else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
            bool = false;
            alertError("Enter a valid email");
        }
        return bool;
    }

    function createUser(){
        var email = document.getElementById("email").value;
        var firstName = document.getElementById("name_signup").value;
        var lastName = document.getElementById("last_name").value;
        var password = document.getElementById("pass").value;
        var description = document.getElementById("description_signup").value;
        var bool=validate(email,firstName,lastName,password);

        if(bool){
            var user = {
                "email":email,
                "firstName":firstName,
                "lastName":lastName,
                "password": password,
                "description": description
            };
            _apiclient.postUser(user).then(function (){
                const Toast = _Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    width: 300,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener("mouseenter", _Swal.stopTimer);
                        toast.addEventListener("mouseleave", _Swal.resumeTimer);
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Signed in successfully"
                });

            }).catch((e) => {
                _Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ya existe un usario con dicho correo"
                })
            })
        }
    }

    return {
        createUser:createUser
    };

})();

