var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Estas sirven tambien:
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express(); //Esto es necesario para todo lo de abajo, inicializamos express

// SETTINGS, nos permite agregar variables:
app.set('views', path.join(__dirname, 'views'));  //configuramos donde estaràn las vistas (los .jade)
app.set('view engine', 'jade');  //configuramos el motor de vistas: usamos jade.
app.set('appName','Aplicacion de envìo y recepciòn de notificaciones'); //Seteamos nombre de la app

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter); //La comento porque lo de adentro de users.js NO lo usamos, sino si irìa.

module.exports = app;

var http = require('http');

var server = http.createServer(app).listen(3000, function(){ //aca le decimos que el servidor escuche en el puerto 3000 
  //y que imprima por CONSOLA lo de abajo. 
  console.log("Servidor funcionando")
  console.log("Nombre de la App:", app.get('appName')) //nombre de la app seteado arriba.
});

//Rutas:
//Los app.get NO los hacemos acà. Los hacemos directamente en routes. 

require('./routes/sockets.js').initialize(server);  //Este si o si lo necesitamos para inicializar el servidor.