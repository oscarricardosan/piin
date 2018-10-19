var App;
function initializePage(){

    $(document).bind("mobileinit", function(){
        $.mobile.allowCrossDomainPages = true;
    });

    App= new Vue({
        el: '#App',
        data: {
            qr_lector_options:
            {
                preferFrontCamera : false, // iOS and Android camara frontal
                showFlipCameraButton : true, // iOS and Android mostrar botón para voltear camara
                showTorchButton : true, // iOS and Android mostrar boton de flash
                torchOn: false, // flash
                prompt : "Ubica el código QR dentro del área de escaneo", // Android
                resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                formats : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
                orientation : "portrait",
            },
            ready: true,
            tipo_multimedia: 'default',
            tipo_multimedia_audio: 'audio',
            tipo_multimedia_imagen: 'imagen',
            tipo_multimedia_video: 'video',
            tipo_multimedia_default: 'default',
            tipo_lector: undefined,
            tipo_lector_qr: 'qr',
            tipo_lector_nfc: 'nfc',
            tiene_nfc: undefined,

            code:{
                point_name: undefined,
                ubication: undefined
            }

        },
        methods: {
            set_tipo_lector: function(lector){
                this.tipo_lector= lector;
                $('#tipo_lectorModal').modal('hide')
            },
            set_tipo_multimedia: function(multimedia){
                this.tipo_multimedia= multimedia;
                $('#tipo_reproduccionModal').modal('hide')
            },

            scan_qr: function(){
                cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        App.set_raw_code(result.text);
                    },
                    function (error) {
                        alert("Scanning failed: " + error);
                    }, App.qr_lector_options
                );
            },
            set_raw_code: function(raw_code){
                var code_parts= raw_code.split(' ');
                this.code.ubication= code_parts[0];
                this.code.point_name= code_parts[1];
                this.play_information();
            },
            play_information: function(){
                try{
                    $.getJSON("resources_external/"+App.code.ubication+".json", function(data) {
                        try{
                            alert(JSON.stringify(data));
                            var point = data["point_"+App.code.point_name];
                            alert(JSON.stringify(point));
                            alert(App.tipo_multimedia);
                            if(App.tipo_multimedia === App.tipo_multimedia_audio){
                                var file= _.findWhere(point.multimedia, {"type": App.tipo_multimedia});
                                alert(JSON.stringify(file));
                                var my_media = new Media(file.src,
                                    function () { },
                                    function (err) { alert("playAudio():Audio Error: " + err); }
                                );
                                my_media.play();
                            }
                        }catch (e) {
                            alert(e);
                        }
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) { alert('getJSON request failed! ' + textStatus); })

                }catch (e) {
                    alert(e);
                }
            }
        },
        filters: {
        },
        computed: {
            leyenda_multimedia: function(){
                if(this.tipo_multimedia === this.tipo_multimedia_audio)
                    return "Para reproducir audio.";
                if(this.tipo_multimedia === this.tipo_multimedia_video)
                    return "Para reproducir video.";
                if(this.tipo_multimedia === this.tipo_multimedia_imagen)
                    return "Para mostrar imagen.";
                return '';

            }
        },
        watch: {
        },
        mounted: function(){

        }
    });

    $(document).ready(function(){

        var url_params= UrlUtility_.getParams();


    });




    /** Ready on mobiles **/
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {

        (function initialize_nfc_listen(){
            nfc.addMimeTypeListener(
                "text/plain",
                function (nfcEvent){
                    if(App.tipo_lector === App.tipo_lector_nfc){
                        try {
                            var contenido_tag_puro= nfc.bytesToString(nfcEvent.tag.ndefMessage[0].payload);
                            var contenido_tag= contenido_tag_puro.substr(3, 80000);
                            App.set_raw_code(contenido_tag);
                        }catch (e) {
                            alert(e);
                        }
                    }
                },
                function() {//Inicializacion exitosa
                    App.tiene_nfc= true;
                    App.tipo_lector= App.tipo_lector_nfc;
                },
                function() {//Inicializacion fallida
                    App.tiene_nfc= false;
                    App.tipo_lector= App.tipo_lector_qr;
                }
            );
        })();



    }
}
