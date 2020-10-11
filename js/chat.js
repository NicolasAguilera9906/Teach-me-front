var ModuleChat = (function () {

    var stompClient =  null;
    const urlAPI = "https://teach2-me.herokuapp.com";
    var classId = localStorage.getItem("studying_class_id");
    var email = localStorage.getItem("username");

    class Messsage {
        constructor(content, sender) {
            this.content = content;
            this.sender = sender;
        }
    }

    function connectToChat() {
        _classId=classId;
        console.log("Conecting to chat...")
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
                document.getElementById("message-container").innerHTML +="<div class=\"media msg \">\n" +
                    "\n" +
                    "                    <div class=\"media-body\">\n" +
                    "                        <small class=\"pull-right time\"><i class=\"fa fa-clock-o\"></i>"+ date+"</small>\n" +
                    "                        <h5 class=\"media-heading\">"+ message.sender +"</h5>\n" +
                    "                        <small class=\"col-lg-10\">"+ message.content+"</small>\n" +
                    "                    </div>\n" +
                    "                </div>"
            });
        });
    }

    function sendMessage(_message){
        var message = new Messsage(_message,email);
        stompClient.send("/app/messages."+_classId,{},JSON.stringify(message));
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
        sendMessage:sendMessage
    };
})();
