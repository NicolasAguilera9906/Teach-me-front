apiclient = (function () {

    const url = "https://teache-me-front.herokuapp.com"

    function postClass(userEmail,clase,token){
        var data = $.ajax({
            url: "https://teach2-me.herokuapp.com/api/v1/users/"+userEmail+"/classes",
            type: 'POST',
            data: JSON.stringify(clase),
            contentType: "application/json",
            headers: {"Authorization": token}
        });
        return data;
    }

    function postUser(user){
        var data = $.ajax({
            url: "https://teach2-me.herokuapp.com/api/v1/users",
            type: 'POST',
            data: JSON.stringify(user),
            contentType: "application/json"
        });
        return data;
    }

    function postLogin(loginRequest){
        var data = $.ajax({
            url: "https://teach2-me.herokuapp.com/login",
            type: 'POST',
            data: JSON.stringify(loginRequest),
            contentType: "application/json"
        });
        return data;
    }

    function validatePage(token,callback){
        var data = $.ajax({
            url: "https://teach2-me.herokuapp.com/validate",
            type: 'GET',
            headers: {"Authorization": token},
            error: function (request, status, error) {
                callback(request.responseText);
            }
        });
        return data;
    }

    function getTeachingClasses(email,callback,token){
        var data = $.ajax({
            url: "https://teach2-me.herokuapp.com/api/v1/users/"+email+"/teachingClasses",
            type: 'GET',
            headers: {"Authorization": token},
            success : function (data, text) {
                callback(data);
            }});
        return data;
    }
    function getClassByName(class_name, callback , token) {
        var data = $.ajax({
            url: "https://teach2-me.herokuapp.com/api/v1/classes?name="+class_name,
            type: 'GET',
            headers: {"Authorization": token},
            success : function (data, text) {
                callback(data);
            }});
        return data;
    }

    return {
        postClass:postClass,
        getClassByName:getClassByName,
        postUser:postUser,
        postLogin:postLogin,
        validatePage:validatePage,
        getTeachingClasses:getTeachingClasses
    };

})();