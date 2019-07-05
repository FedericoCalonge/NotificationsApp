//Cliente 1:
//Este js debe tener lo necesario sòlo para VISUALIZAR las notificacoones.

var socket = io.connect('/');
//Primero nos conectamos con el servidor (linea de arriba). Esto enviarà una request de conexiòn al servidor desde
//la pàgina que fue cargada. Tambien esto negociarà el protocolo de transporte que se utilizarà
//y finalmente dará como resultado que el evento "connection" se active (trigger) en la app del servidor.

socket.on('message', function (data) {
	data = JSON.parse(data);
	$('#messages').append('<div class="'+data.type+'">' + data.message + '</div>');
});

//Las lineas de arriba conectan el manejador de eventos para el evento "message"
//El mensaje que vendra tendremos que adjuntarlo (append) en el area de mensajes "messages".
//Ademàs seteamos la clase "class" para el nuevo tag "div" que agregaremos para que sea del mismo tipo al tipo del msje.
//Igualmente esto de las clases no lo usamos para nada. 

