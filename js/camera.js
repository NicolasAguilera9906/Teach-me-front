var ModuleCamera = (function () {


    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function initCamera(){
        var video = document.querySelector("#videoElement");
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    video.srcObject = stream;
                })
                .catch(function (err0r) {
                    console.log("Something went wrong!");
                });
        }
    }
    function validateTeacherCamera(){
        var token = localStorage.getItem("Authorization");
        var classId = getParameterByName("class");
        apiclient.getUser(localStorage.getItem("username"),token).then(function(response){
            for (var i = 0; i < response.teachingClasses.length; i++) {
                if(response.teachingClasses[i].id==classId){
                    initCamera();
                }
            }
        })
    }

    return {
        validateTeacherCamera:validateTeacherCamera

    };
})();
