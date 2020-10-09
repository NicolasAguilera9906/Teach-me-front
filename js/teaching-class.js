var ModuleTeachingClasse = (function () {

    var _apiclient=apiclient;

    const urlAPI = "https://teache-me-front.herokuapp.com";

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
        _apiclient.getClassById(classId,_write,token);
    }

    function deleteClass(){
        var email = localStorage.getItem("username");
        var token = localStorage.getItem("Authorization");
        var classId = localStorage.getItem("class_id");
        _apiclient.deleteClass(email,classId,token).then(function(){
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
    }

    return {
        getClass:getClass,
        deleteClass:deleteClass
    };
})();