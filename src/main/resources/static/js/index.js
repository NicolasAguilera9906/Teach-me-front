var Moduleindex = (function () {


    function  setName(){
        var name = $("#class_search").val();
        localStorage.setItem("name",name);
    }

    function getTeachingClasses(){
        var email = localStorage.getItem('username');
        var token = localStorage.getItem('Authorization');
        apiclient.getTeachingClasses(email,_select,token);
    }

    function _select(data){
        console.log(data[0].nombre);
        console.log(data[0].id);
        var $select = $('#teaching_classes').selectpicker();
        for (var i = 0; i < data.length; i++) {
            var o = new Option(data[i].nombre,data[i].id);
            $(o).html(data.nombre);
            $select.append(o);
        }
        $(".selectpicker").selectpicker('refresh');
    }


    return {
        setName:setName,
        getTeachingClasses:getTeachingClasses,
    };
})();