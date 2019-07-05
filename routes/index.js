var express = require('express');
var router = express.Router();

//EL / es solo para la landing page.
router.get('/', function(req, res, next) { //cuando mi app reciba un get en / vamos a tener un objeto req y otro res
  res.render('index', { title: 'Home Notifications App' }); 

  //Aca renderizamos la vista para home (/) y le pasamos el titulo.
  //ponemos solo index (y no la ruta donde esta el index.jade, ya que en app.js ya especificamos 
  // en la linea 13--> app.set('views', path.join(__dirname, 'views'));  
});

router.get('/notifications', function(req, res, next) {
  res.render('notificationssininputmessage', { title: 'Notificaciones urgentes (clientes)' }); //Notificaciones con Express PARA los clientes. (client1.js)
  //desde acà visualizan las notificaciones.
});

router.get('/notifications/admin', function(req, res, next) {
  res.render('notifications', { title: 'Notificaciones (admin)' }); //Solo desde acà podemos mandar notificaciones.
});

//Cada vez que recibamos cualquier ruta (*) que no sean las de arriba (por ej. /cualquier ruta)
//vamos a responder con "Archivo no encontrado":
router.get('*', (req,res) => { 
	res.end('Archivo NO encontrado')
});

module.exports = router;  