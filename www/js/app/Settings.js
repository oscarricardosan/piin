var Settings= {
    setSettings: function(settings){
        if(settings !== null && settings !== undefined) {
            this.url_server = settings.url_server;
            this.domain = settings.domain;
        }
    },
    discapacidad: undefined
};