

    var vidyoConnecto;


    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    async function getName(){

        var name= await apiclient.getUser(localStorage.getItem("username"),localStorage.getItem("Authorization")).
        then(function (data){
            return data.firstName+" "+data.lastName;

        });
        return name;

    }

    const getName1 = apiclient.getUser(localStorage.getItem("username"),localStorage.getItem("Authorization")).
        then(function (data){
            return data.firstName+" "+data.lastName;

        });

    const setName = async () => {
        const  name = await getName1;
        return name;
    }

    function onVidyoClientLoaded(status) {
        console.log(status.state)
        if (status.state == "READY") {


            VC.CreateVidyoConnector({
                viewId: "render",
                viewStyle: "VIDYO_CONNECTORVIEWSTYLE_Default",
                remoteParticipants: 8,
                logFileFilter: "warning info@VidyoClient info@VidyoConnector",
                logFileName: "",
                userData: ""
            }).then(function (vidyoConnector) {
                vidyoConnecto=vidyoConnector;
                /*Handle appearance and disappearance of camera devices in the system*/
                vidyoConnector.RegisterLocalCameraEventListener({
                    onAdded: function (localCamera) {
                    },
                    onRemoved: function (localCamera) {
                    },
                    onSelected: function (localCamera) {
                    },
                    onStateUpdated: function (localCamera, state) {
                    }
                }).then(function () {
                    console.log("RegisterLocalCameraEventListener Success");
                }).catch(function () {
                    console.error("RegisterLocalCameraEventListener Failed");
                });

                /*Handle appearance and disappearance of microphone devices in the system*/
                vidyoConnector.RegisterLocalMicrophoneEventListener({
                    onAdded: function (localMicrophone) {
                    },
                    onRemoved: function (localMicrophone) {
                    },
                    onSelected: function (localMicrophone) {
                    },
                    onStateUpdated: function (localMicrophone, state) {
                    }
                }).then(function () {
                    console.log("RegisterLocalMicrophoneEventListener Success");
                }).catch(function () {
                    console.error("RegisterLocalMicrophoneEventListener Failed");
                });

                /*Handle appearance and disappearance of speaker devices in the system*/
                vidyoConnector.RegisterLocalSpeakerEventListener({
                    onAdded: function (localSpeaker) {
                    },
                    onRemoved: function (localSpeaker) {
                    },
                    onSelected: function (localSpeaker) {
                    },
                    onStateUpdated: function (localSpeaker, state) {
                    }
                }).then(function () {
                    console.log("RegisterLocalSpeakerEventListener Success");
                }).catch(function () {
                    console.error("RegisterLocalSpeakerEventListener Failed");
                });
            });
        }
    }
    function joinCall(){
        setName().then(function (name){
            vidyoConnecto.Connect({
                host:"prod.vidyo.io",
                token: "cHJvdmlzaW9uAGp1YW5AMjU5NWNlLnZpZHlvLmlvADYzNzczMTAxMjg5AABkZGJiZmQ5MmQwMzY2NWYyNTVkOGYwOTFjZDI2OWEzNjAwMWU0NDQ0OTY5MzIwOGU2NDk1ZTk0MjQwODU3YjRhYjU2ZTlkMDFmMjI0YTZkYTRhNTRlOGUyNzc2ZTQyZGQ=",
                displayName:name,
                resourceId: getParameterByName("class"),
                onSuccess: function (){

                },
                onFailure: function (reason){
                    console.log("error " + reason)
                },
                onDisconnected: function (reason) {
                    console.log("error " + reason)

                }

            })
        })

    }

