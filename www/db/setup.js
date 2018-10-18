var DB= null;

try{
    document.addEventListener('deviceready', function() {
        DB = window.sqlitePlugin.openDatabase({
            name: "Piin.db",
            location: 'default',
            androidDatabaseImplementation: 2,
            androidLockWorkaround: 1
        });
        Migrations.run();
    });
}catch(e){alert(e.message);}
