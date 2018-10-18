var Settings= {
    setSettings: function(settings){
        alert('settings 1');
        if(settings !== null && settings !== undefined) {
            this.tipo_multimedia = settings.tipo_multimedia;
            alert('settings 2');
            this.tipo_lector = settings.tipo_lector;
            alert('settings 3');
        }
        alert('settings 4alert(\'settings 1\');');
    },
    tipo_multimedia: undefined,
    tipo_lector: undefined
};