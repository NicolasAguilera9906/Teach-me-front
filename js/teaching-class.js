var ModuleTeachingClasse = (function () {

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
        apiclient.getClassById(classId,_write,token);
    }

    return {
        getClass:getClass
    };
})();