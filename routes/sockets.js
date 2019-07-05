//Lado del servidor (còmo maneja el envio de mensajes):

var io = require('socket.io');  //utilizamos el modulo socket.io con la variable io

exports.initialize = function(server) {  
	//Vamos a configurar socket.io para que escuche como servidor HTTP. El servidor HTTP 
	//solo puede ser accedido desde el modulo principal de la app (por esto le pasamos a nuestro mòdulo "server"; ya que sin esto nuestro
	// modulo NO puede hacer nada). Exportamos ademàs un mètodo llamado "initialize" desde nuestro mòdulo; el cual setearà el 
	//socket.io server y ademàs bindearà/enlazarà (bind)  todos los manejadores de mensajes.  
	//Initiaize acepta un servidor HTTP como paràmetro ("server").

	io = io.listen(server);  //Ahora vamos a setear socket.io; para esto pasamos el "server"
	//(el cual es una instancia del mòdulo HTTP server de NODE) al mòdulo socket.io con el mètodo listen para
	//que escuche todo lo que pasa en el servidor. Todo esto lo asignamos a la variable io.

	io.sockets.on("connection", function(socket){
	//Ahora vamos a setear nuestro manejador de mensajes para los mensajes de socket.io
	//EL primer evento que nuestro servidor recibirà es una nueva conexiòn de un nuevo cliente (evento "connection").
	//Este evento notificarà a nuestra app que un nuevo cliente ha abierto una nueva conecciòn  y todo el 
	//protocolo de negociacion (transparente para nosotros) fue completado y ya tenemos disponible ahora un socket 
	//para comunicarnos con este cliente.

	//"connection" es un MANEJADOR de eventos, el cual puede ser activado (triggered).
	//"socket" es un EMISOR de eventos, que puede activar diferentes eventos basados en los mensajes que obtiene. 
	//Hay muchisimos de estos eventos. Ademàs del evento connection que vimos que sirve para manejar eventos en el servidor 
	//hay otros màs que son --> VER WORD.  

		//Enviamos este msje del servidor al cliente para que se muestre en la pàgina.
		socket.send(JSON.stringify(
			{type:'serverMessage',
			message: 'Bienvenido a la App de notificaciones'}));
		//Ahora como vimos arriba como manejar los eventos del socket, vamos a ver ahora como enviar mensajes del S al C:
		//"socket.send" es un metodo que enviara el mensaje al socket (el cual activarà el evento "mensaje" en el cliente).
		//El mensaje enviado debe ser un STRING (por esto usamos JSON.stringify, para enviar la data del mensaje como string).
		//Nuestro mensaje tiene dos partes: un type y el message en sì. 
		
		socket.on('message', function(message){
		//Ahora debemos manejar los userMessages cuando llegen. Para esto seteamos un manejador de eventos 'message'
		//en el scoket (con socket.on). Como cualquier otro connector de eventos, socket.on tomarà 2 parametros (el evento 
		//a manejar (el 2do message) y el manejador de eventos para este (1er message) ). 
		//A diferencia del evento "io.sockets.on", este manejador de eventos 
		//"socket.on" recibirà un mensaje (2do message) como parametro (y NO el socket).
			message= JSON.parse(message); 		
			if(message.type == "userMessage"){
				socket.broadcast.send(JSON.stringify(message));  //enviamos a todos los sockets menos el que envìo el msje.
				//Comentamos estas 2 lineas ya que NO tenemos que enviar el mensaje de vuelta al admin:
				//message.type = "myMessage";
				//socket.send(JSON.stringify(message));  //enviamos al socket que enviò el mensaje.
			}
			//Como el mensaje es un string, parseamos el mensaje en JSON String para crear un objeto "message". Si este msje es
			//enviado por el usuario, este mensaje serà de tipo "usserMessage". Y en ese caso enviaremos el mensaje a todos los 
			//usuarios conectados (para esto socket.io nos provee un objeto "broadcast"). Asì, cuando enviamos un mensaje usando 
			//este objeto, se enviarà a TODOS los clientes que esten conectados (a excepciòn de uno, que es el cliente por el cual
			//se creo este socket). 
		});

	});
};