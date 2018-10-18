var App;
function initializePage(){

    $(document).bind("mobileinit", function(){
        $.mobile.allowCrossDomainPages = true;
    });
    
    
    App= new Vue({
        el: '#App',
        data: {
            ready: true
        },
        methods: {
        },
        filters: {
        },
        computed: {
        },
        watch: {
        },
        mounted: function(){

        }
    });

    $(document).ready(function(){
        var url_params= UrlUtility_.getParams();
        if(url_params.tab !== undefined){
            $('[href="#'+url_params.tab+'"]').click();
        }

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

    }
}
