$(function() {
    FastClick.attach(document.body);

    document.addEventListener("backbutton", onBackKeyDown, false);

    function onBackKeyDown(e) {
        e.preventDefault();
    }
});