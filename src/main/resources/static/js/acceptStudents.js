var ModuleAccept = (function () {


    function _map(list){
        return mapList = list.map(function(request){
            return {
                nombre:request.student.firstName,
                apellido:request.student.lastName,
                correo:request.student.email
            };
        });
    }

    function _table(requests){
        var list_request = _map(requests);
        $("#table_students > tbody").empty();
        list_request.map(function(c){
            $("#table_students > tbody").append(
                "<tr onclick='console.log(\" hola \")' class='hoverRow'>" +
                "<td>" + c.nombre + "</td>"+
                "<td>" + c.apellido + "</td>"+
                "<td>" + c.correo + "</td>"+
                "</tr>"
            );
        });
    }

    function getStudents(){
        var class_id = localStorage.getItem("class_id");
        apiclient.getRequest(localStorage.getItem("username"),class_id,_table,localStorage.getItem("Authorization"));
    }

    return {
        getStudents:getStudents
    };
})();