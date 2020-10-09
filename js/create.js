

$("#datetimepicker_create").datetimepicker({
    language: "en",
    format: "YYYY-MM-DD HH:mm:ss",

});

$("#datetimepicker_create").datetimepicker();


$("#datetimepicker_create1").datetimepicker({
    language: "en",
    format: "YYYY-MM-DD HH:mm:ss",

});

$("#datetimepicker_create1").datetimepicker();


var ModuleCreate = (function () {

    /*
       LOCAL
       http://localhost:63342/Teach-me-front
     */

    const urlAPI = "https://teache-me-front.herokuapp.com";

    let _apiclient = urlAPI+"/js/apiclient.js";

    function formatDate(element){
        var data = document.getElementById(element).value;
        var datasplit=data.split(" ");
        var datastring=datasplit.join("T");
        return datastring;

    }

    
    function createClass(){


        var datastring=formatDate("datetimepickercreate_input");
        var datastring1=formatDate("datetimepickercreate_input1");
        var name = document.getElementById("class_name").value;
        var description = document.getElementById("description_class").value;
        var capacity = document.getElementById("class_capacity").value;
        var clase = {
            "nombre":name,
            "capacity":capacity,
            "description":description,
            "amountOfStudents": 20,
            "dateOfInit": datastring,
            "dateOfEnd": datastring1
            };
        $.getScript(_apiclient,function(){       
            apiclient.postClass(localStorage.getItem("username"),clase,localStorage.getItem("Authorization"))
                .then(function (){
                    Swal.fire({
                        icon: "success",
                        title: "Yeah!",
                        text: "Class created"
                    });
                }).catch((e) => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: e.responseText
                    });
                });
            });
    }

    return {
        createClass: createClass
    };
})();
