var ModuleStudyingClass = (function () {

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    /*
       LOCAL
       http://localhost:63342/Teach-me-front
     */
    const urlAPI = "https://teache-me-front.herokuapp.com";

    let _apiclient = urlAPI+"/js/apiclient.js";
    let _chat = urlAPI+"/js/chat.js";

    var token = localStorage.getItem("Authorization");
    var email = localStorage.getItem("username");
    var classId = getParameterByName("class");

    function formatDate(fecha){
        var datasplit=fecha.split("T");
        var datastring=datasplit.join(" ").split(".")[0].slice(0,-3);
        return datastring;
    }

    function changeButtons(){
        document.getElementById("inscribe_me").setAttribute("onclick", "ModuleStudyingClass.showRequestStatus()");
        document.getElementById("inscribe_me").innerText = "View Request Status";
    }

    function _write(data){

        $("#class_name").append(data.nombre);
        $("#class_availability").append((data.capacity-data.amountOfStudents));
        $("#description_class").append(data.description);
        $("#date_of_init").append(formatDate(data.dateOfInit));
        $("#date_of_end").append(formatDate(data.dateOfEnd));
    }

    function sendRequest(){
        $.getScript(_apiclient,function(){
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
                    changeButtons();
                }).catch((e) => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: e.responseText
                    });
                });
                
            });
        });
    }

    function showRequestStatus(){
        $.getScript(_apiclient,function(){
            apiclient.getUser(email,token).then(function(data){
                apiclient.getRequest(data.id,classId,token).then(function(data){
                    var _status = data.accepted;
                    if(_status==null){
                        _status="Not answered yet";
                    }
                    if(_status===true){
                        _status="Accepted";
                    }
                    if(_status===false){
                        _status="Rejected";
                    }
                    Swal.fire({
                        position : "center",
                        title: "The status of your request is",
                        text: _status,
                    })
                })
            });
        });
    }

    function verifyRequestStatus(){
        $.getScript(_apiclient,function(){
            apiclient.getUser(email,token).then(function(data){
                apiclient.getRequest(data.id,classId,token).then(function(data){
                    changeButtons();
                    if(data.accepted === true){
                        document.getElementById("connect").disabled=false;
                    }
                });
            });
        });
    }

    function getClass(){
        var token = localStorage.getItem("Authorization");
        var classId = getParameterByName("class");
        if (classId===""){
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Oops...",
                text: "Not class selected",
                showConfirmButton: false,
                timer: 2500
            }).then(function(){
                window.location.href=urlAPI+"/index.html";
            });
        }
        else {
            $.getScript(_apiclient,function(){
            apiclient.getClassById(classId,_write,token);
            });
        }

    }

    function connectToClass(){
        window.location.href="session.html?class="+classId;
    }

    return {
        getClass:getClass,
        sendRequest:sendRequest,
        verifyRequestStatus:verifyRequestStatus,
        showRequestStatus:showRequestStatus,
        connectToClass:connectToClass
    };
})();