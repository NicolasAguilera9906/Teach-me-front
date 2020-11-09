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
        $("#class_availability").append((data.capacity-data.amountOfStudents));
        $("#description_class").append(data.description);
        $("#date_of_init").append(formatDate(data.dateOfInit));
        $("#date_of_end").append(formatDate(data.dateOfEnd));
    }

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
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

    function deleteClass(){
        var email = localStorage.getItem("username");
        var token = localStorage.getItem("Authorization");
        var classId = getParameterByName("class");
        $.getScript(_apiclient,function(){
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        apiclient.deleteClass(email,classId,token);
                        Swal.fire(
                            "Deleted!",
                            "Your class has been deleted.",
                            "success"
                        ).then(function () {
                            window.location.href=urlAPI+"/index.html";
                        });
                    }
                })
        });
    }

    function redirectToSession(data) {
        var classId = getParameterByName("class");
        var currentTime = new Date();
        var dateOfInit = new Date(formatDate(data.dateOfInit));
        var dateOfEnd = new Date(formatDate(data.dateOfEnd));
        if(currentTime>=dateOfInit && currentTime<=dateOfEnd){
            window.location.href="session.html?class="+classId;
        }
        else{
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Oops...",
                text: "The class has not started or has already ended",
                showConfirmButton: false,
                timer: 2500
            });
        }
    }

    function connectToClass(){
        var token = localStorage.getItem("Authorization");
        var classId = getParameterByName("class");
        $.getScript(_apiclient,function(){
            apiclient.getClassById(classId,redirectToSession,token);
        });
    }

    function viewRequests(){
        var classId = getParameterByName("class");
        window.location.href='accept.html?class='+classId;
    }

    return {
        getClass:getClass,
        deleteClass:deleteClass,
        viewRequests:viewRequests,
        connectToClass:connectToClass
    };
})();