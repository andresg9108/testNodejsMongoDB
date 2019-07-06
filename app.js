var oExpress = require('express');
var oCors = require('cors');
var oBodyParser = require('body-parser');
var oRequest = require('./request');
var oApp = oExpress();
var iPort = 3000;

oApp.use(oCors());

oApp.use(oExpress.static(__dirname + '/public'));

oApp.use(oBodyParser.urlencoded({ extended: false }));

oRequest.load(oApp);

oApp.listen(iPort, function(){
    console.log('Port: '+iPort);
});