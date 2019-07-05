//Cliente 2:
//Este js debe tener lo necesario sòlo para ENVIAR las notificaciones. Es el client Admin.

var socket = io.connect('/');
//Explicado lo de arriba en client 1.

$(function(){  //cuando document (el html) estè listo... (acà usamos jquery)
	$('#send').click(function(){  //cuando clickeemos en el boton con id send...
		//Creamos un objeto data seteando en message el contenido de la caja de mensajes y en type el tipo de msje.
		var data = {
			message: $('#message').val(),
			type:'userMessage'
		};
		socket.send(JSON.stringify(data));   //Enviamos el objeto data anteriormente creado en el Cliente al Servidor.
		//Y lo enviamos como string al usar JSON.stringify.

		//Y el servidor agarrarìa este msje con -->socket.on('message', function(message){... desde su lado.

		$('#message').val('');
	});
});
