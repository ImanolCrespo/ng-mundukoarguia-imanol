"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Activity = /** @class */ (function () {
    function Activity(id, nombre, fechaPartida, fechaFin, lugares, precio) {
        this.id = id;
        this.nombre = nombre;
        this.fechaPartida = fechaPartida;
        this.fechaFin = fechaFin;
        this.lugares = lugares;
        this.precio = precio;
    }
    return Activity;
}());
var activities = [
    new Activity(0, "Campamento Arizkun", new Date(2021, 7, 16), new Date(2021, 7, 28), ["Arizkun", "Gorraiz de Arce"], 120),
    new Activity(1, "Convivencia Estella", new Date(2021, 2, 19), new Date(2021, 2, 21), ["Estella"], 50),
    new Activity(2, "Javierada", new Date(2021, 3, 14), new Date(2021, 3, 14), ["Huarte", "Lumbier", "Javier"], 15),
    new Activity(3, "Guerra de agua", new Date(2021, 6, 26), new Date(2021, 6, 26), ["Mokarte", "Ferial", "Piscinas de Huarte"], 0)
];
function getActivities() {
    return activities;
}
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.post('/activities', bodyParser.json(), function (req, res) {
    var actNew = new Activity(activities.length + 1, req.body.nombre, req.body.fechaPartida, req.body.fechaFin, ["Huarte"], req.body.precio);
    activities.push(actNew);
    res.status(200).send({
        id: actNew.id,
        nombre: actNew.nombre,
        fechaPartida: actNew.fechaPartida,
        fechaFin: actNew.fechaFin,
        lugares: actNew.lugares,
        precio: actNew.precio
    });
});
app.get('/', function (req, res) {
    res.send('The URL of activities is http://localhost:8000/activities');
});
app.get('/activities', function (req, res) {
    res.json(getActivities());
});
function getActivitiesById(activityId) {
    var a;
    a = activities.find(function (a) { return a.id == activityId; });
    return a;
}
app.get('/activities/:id', function (req, res) {
    res.json(getActivitiesById(parseInt(req.params.id)));
});
function updateActivitiesById(req, activityId) {
    var a;
    a = activities.find(function (a) { return a.id == activityId; });
    var index = activities.indexOf(a);
    a.nombre = req.body.nombre,
        a.fechaPartida = req.body.fechaPartida,
        a.fechaFin = req.body.fechaFin,
        a.lugares = req.body.lugares,
        a.precio = req.body.precio;
    activities[index] = a;
    return a;
}
app.put('/activities/:id', function (req, res) {
    res.json(updateActivitiesById(req, parseInt(req.params.id)));
    res.send('Got a UPDATE request at /user');
});
function deleteActivitiesById(activityId) {
    var a;
    a = activities.find(function (a) { return a.id == activityId; });
    var index = activities.indexOf(a);
    delete activities[index];
    return a;
}
app.delete('/activities/:id', function (req, res) {
    res.json(deleteActivitiesById(parseInt(req.params.id)));
    res.send('Got a DELETE request at /user');
});
var server = app.listen(8000, "localhost", function () {
    var _a = server.address(), address = _a.address, port = _a.port;
    console.log('Listening on %s %s', address, port);
});
