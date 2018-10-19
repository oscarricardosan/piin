var App;
function initializePage(){

    $(document).bind("mobileinit", function(){
        $.mobile.allowCrossDomainPages = true;
    });

    App= new Vue({
        el: '#App',
        data: {
            ready: true,
            tipo_multimedia: undefined,
            tipo_multimedia_audio: 'audio',
            tipo_multimedia_mapa: 'mapa',
            tipo_multimedia_video: 'video',
            tipo_lector: undefined,
            tipo_lector_qr: 'qr',
            tipo_lector_nfc: 'nfc',
            tiene_nfc: undefined
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
                        var vinsScanned = JSON.parse(result.text);
                        alert("VINs scanned:\n" + vinsScanned.join('\n'));
                    },
                    function (error) {
                        alert("Scanning failed: " + error);
                    },
                    {
                        VINs: "VIN1,VIN2,VIN3",
                        vehicles: "Year1 Make1 Model1, Year2 Make2 Model2, Year3 Make3 Model3",
                        isSpeechRecognitionAvailable: false,
                        preferFrontCamera : true, // iOS and Android
                        showFlipCameraButton : true, // iOS and Android
                        showTorchButton : true, // iOS and Android
                        torchOn: true, // Android, launch with the torch switched on (if available)
                        saveHistory: true, // Android, save scan history (default false)
                        prompt : "Place a barcode inside the scan area", // Android
                        resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                        formats : "QR_CODE,CODE_39, CODE_128, DATA_MATRIX",
                        orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                        disableAnimations : true, // iOS
                        disableSuccessBeep: false // iOS and Android
                    }
                );
                return;
                cloudSky.zBar.scan({
                    text_title: "Leer código QR", // Android only
                    text_instructions: "Por favor apuntar tu camara al código QR", // Android only
                }, function(code){
                    alert(code);
                }, function(){});
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
                if(this.tipo_multimedia === this.tipo_multimedia_mapa)
                    return "Para mostrar mapa.";
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
                    try {
                        var contenido_tag_puro= nfc.bytesToString(nfcEvent.tag.ndefMessage[0].payload);
                        var contenido_tag= contenido_tag_puro.substr(3, 80000);
                        alert(contenido_tag);
                    }catch (e) {
                        alert(e);
                    }
                },
                function() {
                    App.tiene_nfc= true;
                    App.tipo_lector= App.tipo_lector_nfc;
                },
                function() {
                    App.tiene_nfc= false;
                    App.tipo_lector= App.tipo_lector_qr;
                }
            );
        })();



    }
}
