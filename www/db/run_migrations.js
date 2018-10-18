var Migrations= (function () {

    var run= function(){
        DB.transaction(function(transaction) {
            transaction.executeSql('CREATE TABLE IF NOT EXISTS migrations (id integer primary key, version integer, desc text)', [],
                function(tx, result) {
                    MigrationModel.get_version({
                        success: function(tx, results){
                            if(results._first.version === null){
                                run_migration_0();
                            }else{
                                runApp();
                            }
                        }
                    });
                },
                function(error) {
                    alert("Error creando tabla migraciones. "+error.message);
                }
            );
        });
    };

    function run_migration_0(){
        alert('run_migration_0');
        var create_table= {
            settings: function(){
                DB.transaction(function(transaction) {
                    transaction.executeSql(
                        'CREATE TABLE IF NOT EXISTS settings (id integer primary key, tipo_multimedia text, tipo_lector text )', [],
                        function (tx, result) {
                            SettingsModel.insert({id: 1}, {success: function () {
                                MigrationModel.insert({
                                    id: 1,
                                    version: 1,
                                    desc: 'Se crea tabla para settings'
                                }, {
                                    success: function(){
                                        runApp();
                                    }
                                });
                            }});
                        },
                        function (error) {alert("Error creando tabla settings. " + error.message);}
                    );
                });
            }
        };
        try{
            create_table.settings();
        }catch (e){alert(e.message);}
    }

    function runApp(){
        alert('runApp');
        try{
            SettingsModel.get({
                success: function(tx, results){
                    Settings.setSettings(results._first);
                    initializePage();
                }
            });
        }catch (e){ alert('RunApp:  '+e.message); }
    }



    function construct(){//Función que controla cuales son los metodos publicos
        return {
            run    : run,
        }
    }
    return {construct:construct};//retorna los metodos publicos
})().construct();

/*
    if(!MigrationModel.migrationWasExecuted(1)){
        Default_calculatorModel.insertOrUpdate({empty: true});
        MigrationModel.store(1, 'Se crea colección para valores por defecto de la calculadora.');
        console.log('Migration 1 executed');
    }

    if(!MigrationModel.migrationWasExecuted(2)){
        Default_emailModel.insertOrUpdate({empty: true});
        MigrationModel.store(2, 'Se crea colección para valores por defecto de la calculadora.');
        console.log('Migration 2 executed');
    }
});*/