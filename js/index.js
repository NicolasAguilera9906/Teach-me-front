var Moduleindex = (function () {

    /*
       LOCAL
       http://localhost:63342/Teach-me-front
     */
    const urlAPI = "https://teache-me-front.herokuapp.com";


    let _apiclient = urlAPI+"/js/apiclient.js";

    function  redirectSearchResults(){
        var name = $("#class_search").val();
        if (name === ""){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Type something",
            });
        }
        else {
            window.location.href = "search-result.html?query=" + name;
        }
    }

    function _selectteachingclasses(data){
        var $select = $("#teaching_classes").selectpicker();
        for (var i = 0; i < data.length; i++) {
            var o = new Option(data[i].nombre,data[i].id);
            $(o).html(data.nombre);
            $select.append(o);
        }
        $(".selectpicker").selectpicker("refresh");
    }

    function _selectstudyingclasses(data){
        var $select = $("#studying_classes").selectpicker();
        for (var i = 0; i < data.length; i++) {
            var o = new Option(data[i].nombre,data[i].id);
            $(o).html(data.nombre);
            $select.append(o);
        }
        $(".selectpicker").selectpicker("refresh");
    }

    function getTeachingClasses(){
        var email = localStorage.getItem("username");
        var token = localStorage.getItem("Authorization");
        $.getScript(_apiclient,function(){
            apiclient.getTeachingClasses(email,_selectteachingclasses,token);
        });
    }

    function getStudyingClasses(){
        var email = localStorage.getItem("username");
        var token = localStorage.getItem("Authorization");
        $.getScript(_apiclient,function(){
            apiclient.getStudyingClasses(email,_selectstudyingclasses,token);
        });
    }

    function showName(){
        apiclient.getUser(localStorage.getItem("username"),localStorage.getItem("Authorization")).
            then(function (data){
                document.getElementById("welcome").innerHTML = "Welcome "+data.firstName+" "+data.lastName;
        })
    }


    return {
        getStudyingClasses:getStudyingClasses,
        getTeachingClasses:getTeachingClasses,
        redirectSearchResults:redirectSearchResults,
        showName:showName
    };
})();