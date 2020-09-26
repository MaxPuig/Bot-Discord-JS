//Envía los comandos disponibles (Excluyendo .backup y .rss)
function sendHelp(msg) {
    if (msg.content.toLowerCase() == '.help') {
        let mensaje = '**COMANDOS**\n `.tiempo` Tu tiempo jugado\n`.tiempo + {Inicio del apodo}` Tiempo jugado de otros\n`.cine` Horario de cines rotonda\n`.ttt` 3 en raya\n`.c4` Conecta 4\n`.peli` Pelicula ASCII\n`.among us` Crea una lista';
        msg.channel.send(mensaje);
    }
};


module.exports = { sendHelp };