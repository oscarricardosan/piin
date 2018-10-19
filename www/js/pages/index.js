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
                var types = ["QR Code"];

                /**
                 * Initiate scan with options
                 * NOTE: Some features are unavailable without a license
                 * Obtain your key at http://pdf417.mobi
                 */
                var options = {
                    beep : true,  // Beep on
                    noDialog : true, // Skip confirm dialog after scan
                    uncertain : false, //Recommended
                    quietZone : false, //Recommended
                    highRes : false, //Recommended
                    inverseScanning: false,
                    frontFace : false
                };

// This license key allows setting overlay views for this application ID: mobi.pdf417.demo
                var licenseiOs = "RZNIT6NY-YUY2L44B-JY4C3TC7-LE5LFU2B-JOAF4FO3-L5MTVMWT-IFFYAXQV-3NPQQA4G";

// This license is only valid for package name "mobi.pdf417.demo"
                var licenseAndroid = "UDPICR2T-RA2LGTSD-YTEONPSJ-LE4WWOWC-5ICAIBAE-AQCAIBAE-AQCAIBAE-AQCFKMFM";

// This license is only valid for Product ID "e2994220-6b3d-11e5-a1d6-4be717ee9e23"
                var licenseWP8 = "5JKGDHZK-5WN4KMQO-6TZU3KDQ-I4YN67V5-XSN4FFS3-OZFAXHK7-EMETU6XD-EY74TM4T";

                cordova.plugins.pdf417Scanner.scan(
                    // Register the callback handler
                    function callback(scanningResult) {
                        // handle cancelled scanning
                        if (scanningResult.cancelled == true) {
                            alert("Cancelled!");
                            return;
                        }

                        alert(JSON.stringify(scanningResult));
                        var resultList = scanningResult.resultList;
                        alert(JSON.stringify(resultList));
                        for (var i = 0; i < resultList.length; i++) {
                            var recognizerResult = resultList[i];
                            alert(JSON.stringify(recognizerResult));
                        }
                    },

                    // Register the error callback
                    function errorHandler(err) {
                        alert('Error');
                    },

                    types, options, licenseiOs, licenseAndroid
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
