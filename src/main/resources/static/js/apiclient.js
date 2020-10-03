apiclient = (function () {

    const url = "https://teache-me-front.herokuapp.com"

    function postClass(userEmail,clase){
        var data = $.ajax({

            url: "https://teach2-me.herokuapp.com/api/v1/users/"+userEmail+"/classes",
            type: 'POST',
            data: JSON.stringify(clase),
            contentType: "application/json"
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

    function getClassByName(class_name, callback) {
        $.getJSON("https://teach2-me.herokuapp.com/api/v1/classes?name="+class_name, function (data) {
            callback(data);
        });
    }

    function getClassByName(class_name, callback) {
        $.getJSON("https://teach2-me.herokuapp.com/api/v1/classes?name="+class_name, function (data) {
            callback(data);
        });
    }

    return {
        postClass:postClass,
        getClassByName:getClassByName,
        postUser:postUser,
        postLogin:postLogin,
        validatePage:validatePage
    };

})();