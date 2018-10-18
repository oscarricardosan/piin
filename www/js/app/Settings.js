var Settings= {
    setSettings: function(settings){
        if(settings !== null && settings !== undefined) {
            this.tipo_multimedia = settings.tipo_multimedia;
            this.tipo_lector = settings.tipo_lector;
        }
    },
    tipo_multimedia: undefined,
    tipo_lector: undefined
};