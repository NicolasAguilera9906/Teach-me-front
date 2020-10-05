var ModuleAccept = (function () {

    var _selectedId;

    function _map(list){
        return mapList = list.map(function(request){
            return {
                nombre:request.student.firstName,
                apellido:request.student.lastName,
                correo:request.student.email,
                idStudentd:request.student.id
            };
        });
    }

    function setSelectedId(id){
        _selectedId=id;
    }

    function acceptStudent(id){
        setSelectedId(id);
        Swal.fire({
            title: 'You want accept this student?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, accept!'
        }).then((result) => {
            if (result.isConfirmed) {
                var request={
                    "requestId":{
                        "student":_selectedId,
                        "clase":localStorage.getItem("class_id")
                    },
                    "accepted":true
                };
                apiclient.putRequest(localStorage.getItem("username"),localStorage.getItem("class_id"),request,localStorage.getItem("Authorization")).then(function (){
                    console.log("put succesful");
                    apiclient.getRequest(localStorage.getItem("username"),localStorage.getItem("class_id"),_table,localStorage.getItem("Authorization"));

                });
            }
        })
    }

    function _table(requests){
        console.log(requests);
        var list_request = _map(requests);
        $("#table_students > tbody").empty();
        list_request.map(function(c){
            var onclick = "ModuleAccept.acceptStudent(\""+c.idStudentd+"\")";
            var stri="'"+onclick+"'";
            $("#table_students > tbody").append(
                "<tr onclick="+stri+" class='hoverRow' >" +
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
        getStudents:getStudents,
        acceptStudent:acceptStudent
    };
})();