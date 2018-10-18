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
        },
        methods: {
            set_tipo_lector: function(lector){
                this.tipo_lector= lector;
                $('#tipo_lectorModal').modal('hide')
            },
            set_tipo_multimedia: function(multimedia){
                this.tipo_multimedia= multimedia;
                $('#tipo_reproduccionModal').modal('hide')
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

        $('#scan_barcode_to_search').click(function(){
            cloudSky.zBar.scan({
                text_title: "Leer código de barras", // Android only
                text_instructions: "Por favor apuntar tu camara al código de barras", // Android only
            }, function(code){
                App.number_search= code;
            }, function(){});
        });


    });




    /** Ready on mobiles **/
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        nfc.addMimeTypeListener(
            "text/plain",
            parseTag,
            function() {
                alert("NFC, activo.");
            },
            function() {
                alert("Fail. addMimeTypeListener");
            }
        );

        function parseTag(nfcEvent) {
            try {
                var records = nfcEvent.tag.ndefMessage;
                alert(records[0]);

            }catch (e) {
                alert(e);
            }
        }

    }
}
