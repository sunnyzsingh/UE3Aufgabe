/*jslint node: true */
/*jslint esversion: 6*/
/*jslint eqeqeq: true */

var express = require('express');
var app = express();
var fs = require("fs");
var expressWs = require('express-ws')(app);
var http = require('http');

var simulation = require('./simulation.js');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var uuid = require('uuid');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

//TODO Implementieren Sie hier Ihre REST-Schnittstelle
/* Ermöglichen Sie wie in der Angabe beschrieben folgende Funktionen:
*/


// Abrufen aller Geräte als Liste
function readDevices()
{
}

app.get('/test', function (req, res)
{
    fs.readFile( "resources/" + "devices.json", 'utf8', function (err, data)
    {
        res.end( JSON.stringify(data) );
    });
})


 /*
 *  Hinzufügen eines neuen Gerätes
 *  Löschen eines vorhandenen Gerätes
 *  Bearbeiten eines vorhandenen Gerätes (Verändern des Gerätezustandes und Anpassen des Anzeigenamens)
 *  Log-in und Log-out des Benutzers
 *  Ändern des Passworts
 *  Abrufen des Serverstatus (Startdatum, fehlgeschlagene Log-ins).
 *
 *  BITTE BEACHTEN!
 *      Verwenden Sie dabei passende Bezeichnungen für die einzelnen Funktionen.
 *      Achten Sie bei Ihrer Implementierung auch darauf, dass der Zugriff nur nach einem erfolgreichem Log-In erlaubt sein soll.
 *      Vergessen Sie auch nicht, dass jeder Client mit aktiver Verbindung über alle Aktionen via Websocket zu informieren ist.
 *      Bei der Anlage neuer Geräte wird eine neue ID benötigt. Verwenden Sie dafür eine uuid (https://www.npmjs.com/package/uuid, Bibliothek ist bereits eingebunden).
 */

app.post('/onSubmit', function(req, res) {
    readUser().catch().then(function (data) {
        var ret = false;
        for(var i = 0; i < data.length; i++){
            if(data[i].username === req.body.username && data[i].password === req.body.password){
                ret = true;
            }
        }
        res.send(ret);
    });
});

app.get("/readDevices", function (req, res) {
    readDevices().then(function (data) {
        res.send(data);
    });
});

app.post("/updateCurrent", function (req, res) {
    "use strict";
    //TODO Vervollständigen Sie diese Funktion, welche den aktuellen Wert eines Gerätes ändern soll
    /*
     * Damit die Daten korrekt in die Simulation übernommen werden können, verwenden Sie bitte die nachfolgende Funktion.
     *      simulation.updatedDeviceValue(device, control_unit, Number(new_value));
     * Diese Funktion verändert gleichzeitig auch den aktuellen Wert des Gerätes, Sie müssen diese daher nur mit den korrekten Werten aufrufen.
     */
});


function readUser() {
    "use strict";
    var loginValues;
    var loginValues2 = [];
    var loginValues3 = [];

    return new Promise(function (resolve,reject) {
        fs.readFile('resources/login.config', function (err, data) {
            if(err){
                reject(err);
            }else{
                loginValues = data.toString().split("\r\n");
                for(var i = 0; i < loginValues.length; i++){
                    loginValues2.push(loginValues[i].split(": "));
                }
                for(var j = 0,k = 1; k < loginValues2.length; j += 2,k += 2){
                    loginValues3.push({username:loginValues2[j][1],password:loginValues2[k][1]});
                }
                resolve(loginValues3);
            }

        })
    });


    //TODO Lesen Sie die Benutzerdaten aus dem login.config File ein.
}

function readDevices() {
    "use strict";
    //TODO Lesen Sie die Gerätedaten aus der devices.json Datei ein.
    return new Promise(function(resolve, reject) {
        fs.readFile('resources/devices.json', function(err, data){
            if (err)
                reject(err);
            else{
                resolve(data.toString());
               
            }
        });
    });
    /*
     * Damit die Simulation korrekt funktioniert, müssen Sie diese mit nachfolgender Funktion starten
     *      simulation.simulateSmartHome(devices.devices, refreshConnected);
     * Der zweite Parameter ist dabei eine callback-Funktion, welche zum Updaten aller verbundenen Clients dienen soll.
     */
}


function refreshConnected() {
    "use strict";
    //TODO Übermitteln Sie jedem verbundenen Client die aktuellen Gerätedaten über das Websocket
    /*
     * Jedem Client mit aktiver Verbindung zum Websocket sollen die aktuellen Daten der Geräte übermittelt werden.
     * Dabei soll jeder Client die aktuellen Werte aller Steuerungselemente von allen Geräte erhalten.
     * Stellen Sie jedoch auch sicher, dass nur Clients die eingeloggt sind entsprechende Daten erhalten.
     *
     * Bitte beachten Sie, dass diese Funktion von der Simulation genutzt wird um periodisch die simulierten Daten an alle Clients zu übertragen.
     */
}


var server = app.listen(8081, function () {
    "use strict";
    readUser();
    readDevices();

    var host = server.address().address;
    var port = server.address().port;
    console.log("Big Smart Home Server listening at http://%s:%s", host, port);
});

