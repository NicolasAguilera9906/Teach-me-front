var Moduleindex = (function () {


    function  setName(){
        var name = $("#class_search").val();
        localStorage.setItem("name",name);
    }

    function getTeachingClasses(){
        var email = localStorage.getItem('username');
        var token = localStorage.getItem('Authorization');
        apiclient.getTeachingClasses(email,_selectteachingclasses,token);
    }

    function getStudyingClasses(){
        var email = localStorage.getItem('username');
        var token = localStorage.getItem('Authorization');
        apiclient.getStudyingClasses(email,_selectstudyingclasses,token);
    }

    function _selectteachingclasses(data){
        console.log(data);
        var $select = $('#teaching_classes').selectpicker();
        for (var i = 0; i < data.length; i++) {
            var o = new Option(data[i].nombre,data[i].id);
            $(o).html(data.nombre);
            $select.append(o);
        }
        $(".selectpicker").selectpicker('refresh');
    }

    function _selectstudyingclasses(data){
        var $select = $('#studying_classes').selectpicker();
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
        getStudyingClasses:getStudyingClasses
    };
})();