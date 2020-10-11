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
            stompClient.subscribe("/topic/messages."+classId) , function (response) {
                alert("hola");
            }
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
