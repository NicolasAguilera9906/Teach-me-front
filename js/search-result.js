
var Modulesearch = (function () {

    let apiclient = "js/apiclient.js";


    function formatDate(fecha){
        var datasplit=fecha.split("T");
        var datastring=datasplit.join(" ").split(".")[0].slice(0,-3);
        return datastring;
    }

    function _map(list){
        var mapList = null;
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
        var listClasses = _map(classes);
        if (listClasses.length===0) {
            document.getElementById("table_footer").innerHTML = "No se encontraron clases";
        }
        else{
            $("#table_class > tbody").empty();
            listClasses.map(function(c){
                var onclick = "Modulesearch.getInfo(\""+c.id+"\")";
                var stri="'"+onclick+"'";
                $("#table_class > tbody").append(
                    "<tr onclick="+stri+" class='hoverRow' >" +
                    "<td>" + c.nombre+ "</td>"+
                    "<td>" + c.description + "</td>"+
                    "<td>" + c.fechaInicio + "</td>"+
                    "<td>" + c.fechaFin + "</td>"+
                    "<td>" + c.capacity + "</td>"+
                    "</tr>"
                );
            });
        }
    }

    function getInfo(id){
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


