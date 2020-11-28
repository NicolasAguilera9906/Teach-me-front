

    var vidyoConnecto;

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }


    const getName1 = apiclient.getUser(localStorage.getItem("username"),localStorage.getItem("Authorization")).
        then(function (data){
            return data.firstName+" "+data.lastName;

        });

    const setName = async () => {
        const  name = await getName1;
        return name;
    };

    function onVidyoClientLoaded(status) {
        if (status.state === "READY") {

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

                }).catch(function () {

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

                }).catch(function () {

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

                }).catch(function () {

                });
            });
        }
    }


    async function getName(){

        var id= await apiclient.getUser(localStorage.getItem("username"),localStorage.getItem("Authorization")).
            then(function (data){
                return data.id;

            });
        return id;

    }


    function joinCall(){
        setName().then(function (name){
            getName().then(function (id) {
                apiclient.getTokenCall(localStorage.getItem("username"),localStorage.getItem("Authorization"),id).
                    then(function (token) {
                    vidyoConnecto.Connect({
                        host:"prod.vidyo.io",
                        token: token,
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
            })

        })
    }

