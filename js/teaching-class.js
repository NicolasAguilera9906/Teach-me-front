var ModuleTeachingClasse = (function () {

    /*
       LOCAL
       http://localhost:63342/Teach-me-front
     */
    const urlAPI = "https://teache-me-front.herokuapp.com";

    let _apiclient = urlAPI+"/js/apiclient.js";

    function formatDate(fecha){
        var datasplit=fecha.split("T");
        var datastring=datasplit.join(" ").split(".")[0].slice(0,-3);
        return datastring;
    }

    function _write(data){
        $("#class_name").append(data.nombre);
        $("#description_class").append(data.description);
        $("#date_of_init").append(formatDate(data.dateOfInit));
        $("#date_of_end").append(formatDate(data.dateOfEnd));
    }

    function getClass(){
        var token = localStorage.getItem("Authorization");
        var classId = localStorage.getItem("class_id");
        $.getScript(_apiclient,function(){
            apiclient.getClassById(classId,_write,token);
        });
    }

    function deleteClass(){
        var email = localStorage.getItem("username");
        var token = localStorage.getItem("Authorization");
        var classId = localStorage.getItem("class_id");
        $.getScript(_apiclient,function(){
            apiclient.deleteClass(email,classId,token).then(function(){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Class deleted",
                    showConfirmButton: false,
                    timer: 2500
                }).then(function(){
                    window.location.href=urlAPI+"/index.html";
                });
            })
        });
    }

    return {
        getClass:getClass,
        deleteClass:deleteClass
    };
})();