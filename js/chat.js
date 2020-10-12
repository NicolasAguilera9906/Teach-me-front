var ModuleChat = (function () {

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    class Messsage {
        constructor(content, sender) {
            this.content = content;
            this.sender = sender;
        }
    }

    var stompClient =  null;
    const urlAPI = "https://teach2-me.herokuapp.com";
    var classId = getParameterByName("class");
    var email = localStorage.getItem("username");
    let _apiclient = urlAPI+"/js/apiclient.js";

    function putMessage(user,message,date){
        document.getElementById("message-container").innerHTML +="<div class=\"media msg \">\n" +
            "\n" +
            "                    <div class=\"media-body\">\n" +
            "                        <small class=\"pull-right time\"><i class=\"fa fa-clock-o\"></i>"+ date+"</small>\n" +
            "                        <h5 class=\"media-heading\">"+ user +"</h5>\n" +
            "                        <small class=\"col-lg-10\">"+ message+"</small>\n" +
            "                    </div>\n" +
            "                </div>";
    }

    function show(data){
        var listMessages = _map(data);
        listMessages.map(function(c){
            var date = c.date.split('T')[1].slice(0,5);
            putMessage(c.sender,c.content,date);

        });

    }



    function _map(list){
        var mapList = null;
        return mapList = list.map(function(message){
            return {
                content:message.content,
                sender:message.sender,
                date:message.date

            };
        });
    }

    function loadMessages(){
        apiclient.getMessagesById(classId,email, show, localStorage.getItem("Authorization"));


    }

    function connectToChat() {
        console.log("Conecting to chat...");
        let socket = new SockJS(urlAPI + '/chat');
        stompClient = Stomp.over(socket);
        console.log(stompClient);
        stompClient.connect({},function (frame) {
            console.log("Connected to: " + frame);
            stompClient.subscribe('/topic/messages.'+classId , function (response) {
                console.log(response.body);
                var message = JSON.parse(response.body);
                var dateSend = new Date();
                var date = dateSend.getHours()+":"+dateSend.getMinutes();
                putMessage(message.sender,message.content,date);
            });
        });
    }

    function sendMessage(_message){
        var message = new Messsage(_message,email);
        stompClient.send("/app/messages."+classId,{},JSON.stringify(message));
        $("#messageInput").val('');
        console.log(email+" :"+_message);

    }

    function disconnect(){
        if (stompClient !== null) {
            stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    return {
        connectToChat:connectToChat,
        sendMessage:sendMessage,
        loadMessages:loadMessages
    };
})();