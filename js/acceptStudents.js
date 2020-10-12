var ModuleAccept = (function () {

    /*
       LOCAL
       http://localhost:63342/Teach-me-front
     */
    const urlAPI = "https://teache-me-front.herokuapp.com";

    var _selectedId;

    let _apiclient = urlAPI+"/js/apiclient.js";

    function _map(list){

        var mapList=null;
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

    function _table(requests){
        var listRequest = _map(requests);
        $("#table_students > tbody").empty();
        if (listRequest.length===0) {
            document.getElementById("table_footer").innerHTML = "No se encontraron estudiantes";
        }
        else{
            listRequest.map(function(c){
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
    }

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function acceptStudent(id){
        setSelectedId(id);
        Swal.fire({
            title: "You want accept this student?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, accept!",
            cancelButtonText: "Dont accept"
        }).then((result) => {
            var request = null;
            if (result.isConfirmed) {
                request={
                    "requestId":{
                        "student":_selectedId,
                        "clase":getParameterByName("class")
                    },
                    "accepted":true
                };
                $.getScript(_apiclient,function(){
                    apiclient.putRequest(localStorage.getItem("username"),getParameterByName("class"),request,localStorage.getItem("Authorization"))
                        .then(function (){
                            apiclient.getRequestsOfAClass(localStorage.getItem("username"),getParameterByName("class"),_table,localStorage.getItem("Authorization"));

                        });
                    });
                }
            else if (result.dismiss === Swal.DismissReason.cancel){
                request={
                    "requestId":{
                        "student":_selectedId,
                        "clase":getParameterByName("class")
                    },
                    "accepted":false
                };
                $.getScript(_apiclient,function(){
                    apiclient.putRequest(localStorage.getItem("username"),getParameterByName("class"),request,localStorage.getItem("Authorization"))
                        .then(function (){
                            apiclient.getRequestsOfAClass(localStorage.getItem("username"),getParameterByName("class"),_table,localStorage.getItem("Authorization"));

                        });
                })
            }
        });
    }



    function getStudents(){
        var classId = getParameterByName("class");
        $.getScript(_apiclient,function(){
            apiclient.getRequestsOfAClass(localStorage.getItem("username"),classId,_table,localStorage.getItem("Authorization"));
        });
    }


    return {
        getStudents:getStudents,
        acceptStudent:acceptStudent
    };
})();