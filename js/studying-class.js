var ModuleStudyingClass = (function () {

    var status = null;

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

    function sendRequest(){
        var token = localStorage.getItem("Authorization");
        var email = localStorage.getItem("username");
        var classId = localStorage.getItem("studying_class_id");
        apiclient.getUser(email,token).then(function(data){
            var request={
                "requestId":{
                    "student": data.id,
                    "clase":classId
                },
            };
            apiclient.postRequest(email,classId,request,token).then(function(){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your request has been sended",
                    showConfirmButton: false,
                    timer: 1500
                });
                verifyRequestStatus();
            })
            
        })
    }

    function changeButtons(err,data){
        if(err==null){
            status = data.accepted;
            document.getElementById("inscribe_me").setAttribute("onclick", "ModuleStudyingClass.showRequestStatus()");
            document.getElementById("inscribe_me").innerText = "View Request Status";
        }
    }

    function showRequestStatus(){
        var _status;
        if(status==null){
            _status="Not answered yet";
        }
        if(status===true){
            _status="Accepted";
        }
        if(status===false){
            _status="Rejected";
        }

        Swal.fire({
            position : "center",
            title: "The status of your request is",
            text: _status,
          })
    }

    function verifyRequestStatus(){
        var token = localStorage.getItem("Authorization");
        var email = localStorage.getItem("username");
        var classId = localStorage.getItem("studying_class_id");
        apiclient.getUser(email,token).then(function(data){
            apiclient.getRequest(data.id,classId,changeButtons,token);
        });
    };

    function getClass(){
        var token = localStorage.getItem("Authorization");
        var classId = localStorage.getItem("studying_class_id");
        apiclient.getClassById(classId,_write,token);
    }

    return {
        getClass:getClass,
        sendRequest:sendRequest,
        verifyRequestStatus:verifyRequestStatus,
        showRequestStatus:showRequestStatus
    };
})();