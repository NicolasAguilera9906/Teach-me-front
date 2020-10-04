
var Modulesearch = (function () {

    /*
    function hola(){
        //alert("hola "+localStorage.getItem("name"));
        $("#pid").text(localStorage.getItem("name"))
    }
    */

    function formatDate(fecha){
        var datasplit=fecha.split("T");
        var datastring=datasplit.join(" ").split(".")[0].slice(0,-3);
        return datastring;
    }

    function _map(list){
        return mapList = list.map(function(clase){
            return {
                nombre:clase.nombre,
                description:clase.description,
                fechaInicio:formatDate(clase.dateOfInit),
                fechaFin:formatDate(clase.dateOfEnd),
                capacity:clase.capacity,
                id:clase.id
            };
        });
    }

    function _table(classes){
        var functions = _map(classes);
        $("#table_class > tbody").empty();
        functions.map(function(c){
            var onclick = "Modulesearch.getInfo(\""+c.id+"\")";
            console.log(onclick);
            var stri="'"+onclick+"'";
            console.log(stri);
            $("#table_class > tbody").append(
                "<tr onclick="+stri+">" +
                "<td>" +"<a>"+ c.nombre+"</a>" + "</td>"+
                "<td>" + c.description + "</td>"+
                "<td>" + c.fechaInicio + "</td>"+
                "<td>" + c.fechaFin + "</td>"+
                "<td>" + c.capacity + "</td>"+
                "</tr>"
            );
        });
    }

    function getInfo(id){
        console.log(id);
        localStorage.setItem("studying_class_id",id);
        window.location.href="selectclass.html";
    }

    function getClasses(){
        apiclient.getClassByName(localStorage.getItem("name"),_table,localStorage.getItem("Authorization"));
    }

    return {
        getClasses:getClasses,
        getInfo:getInfo
    };
})();


