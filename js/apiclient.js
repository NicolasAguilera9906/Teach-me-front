var apiclient = (function () {



    function postClass(userEmail,clase,token){
        var data = $.ajax({
            url: "https://teach2-me.herokuapp.com/api/v1/classes",
            type: "POST",
            data: JSON.stringify(clase),
            contentType: "application/json",
            headers: {"Authorization": token , "x-userEmail" : userEmail}
        });
        return data;
    }

    function deleteClass(userEmail,classId,token){
        var data = $.ajax({
            url: "https://teach2-me.herokuapp.com/api/v1/classes/"+classId,
            type: "DELETE",
            contentType: "application/json",
            headers: {"Authorization": token , "x-userEmail" : userEmail}
        });
        return data;
    }

    function postUser(user){
        var data = $.ajax({
            url: "https://teach2-me.herokuapp.com/api/v1/users",
            type: "POST",
            data: JSON.stringify(user),
            contentType: "application/json"
        });
        return data;
    }

    function postLogin(loginRequest){
        var data = $.ajax({
            url: "https://teach2-me.herokuapp.com/login",
            type: "POST",
            data: JSON.stringify(loginRequest),
            contentType: "application/json"
        });
        return data;
    }

    function validatePage(token,callback){
        var data = $.ajax({
            url: "https://teach2-me.herokuapp.com/validate",
            type: "GET",
            headers: {"Authorization": token},
            error: function (request, status, error) {
                callback(request.responseText);
            }
        });
        return data;
    }

    function getTeachingClasses(email,callback,token){
        var data = $.ajax({
            url: "https://teach2-me.herokuapp.com/api/v1/teachingClasses",
            type: "GET",
            headers: {"Authorization": token , "x-userEmail" : email},
            success : function (data, text) {
                callback(data);
            }});
        return data;
    }

    function getUser(email,token){
        var data = $.ajax({
            url: "https://teach2-me.herokuapp.com/api/v1/users/"+email,
            type: "GET",
            headers: {"Authorization": token}
        });
        return data;
    }

    function getStudyingClasses(email,callback,token){
        var data = $.ajax({
            url: "https://teach2-me.herokuapp.com/api/v1/studyingClasses/",
            type: "GET",
            headers: {"Authorization": token,  "x-userEmail" : email},
            success : function (data, text) {
                callback(data);
            }});
        return data;
    }

    function getClassById(classId,callback,token){
        var data = $.ajax({
            url: "https://teach2-me.herokuapp.com/api/v1/classes/"+classId,
            type: "GET",
            headers: {"Authorization": token},
            success : function (data, text) {
                callback(data);
            },
            error: function (request){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: JSON.parse(request.responseText).message
                });

            }
        });

        return data;
    }

    function getClassByName(className, callback , token) {
        var data = $.ajax({
            url: "https://teach2-me.herokuapp.com/api/v1/classes?name="+className,
            type: "GET",
            headers: {"Authorization": token},
            success : function (data, text) {
                callback(data);
            },
            error: function (request){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: request.responseText
                });

            }
        });
        return data;
    }

    function getRequestsOfAClass(email,classId,callback, token) {
        var data = $.ajax({
            url: "https://teach2-me.herokuapp.com/api/v1/classes/"+classId+"/requests",
            type: "GET",
            headers: {"Authorization": token , "x-userEmail" : email},
            success : function (data, text) {
                callback(data);
            },
            error: function (request){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: request.responseText
                });
                $("#table_students > tbody").empty();
            }
        });
        return data;
    }

    function getRequest(userId,classId,token) {
        var data = $.ajax({
            url: "https://teach2-me.herokuapp.com/api/v1/requests/"+classId+"/"+userId,
            type: "GET",
            headers: {"Authorization": token}
        });
        return data;
    }

    function putRequest(email,classId,request,token) {
        var data = $.ajax({
            url: "https://teach2-me.herokuapp.com/api/v1/classes/"+classId+"/requests",
            type: "PUT",
            data: JSON.stringify(request),
            contentType: "application/json",
            headers: {"Authorization": token , "x-userEmail" : email}
        });
        return data;
    }

    function postRequest(email,classId,request,token) {
        var data = $.ajax({
            url: "https://teach2-me.herokuapp.com/api/v1/classes/"+classId+"/requests",
            type: "POST",
            data: JSON.stringify(request),
            contentType: "application/json",
            headers: {"Authorization": token , "x-userEmail" : email},
        });
        return data;
    }


    function getMessagesById(classId,email, callback , token) {
        var data = $.ajax({
            url: "https://teach2-me.herokuapp.com/api/v1/messages/"+classId,
            type: "GET",
            headers: {"Authorization": token,"x-userEmail" : email},
            success : function (data, text) {
                callback(data);
            },
            error: function (request){
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "No class selected",
                    showConfirmButton: false,
                    timer: 2500
                }).then(function(){
                    window.location.href="https://teache-me-front.herokuapp.com/index.html";
                });

            }
        });
        return data;
    }

    return {
        postClass:postClass,
        getClassByName:getClassByName,
        postUser:postUser,
        postLogin:postLogin,
        validatePage:validatePage,
        getTeachingClasses:getTeachingClasses,
        getClassById:getClassById,
        getRequestsOfAClass:getRequestsOfAClass,
        getRequest:getRequest,
        getStudyingClasses:getStudyingClasses,
        putRequest:putRequest,
        getUser:getUser,
        postRequest:postRequest,
        deleteClass:deleteClass,
        getMessagesById:getMessagesById
    };

})();