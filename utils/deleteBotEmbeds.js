require('dotenv').config({ path: '../.env' });


//Elimina la preview de los links que van dirigidos a los bots de música y también los mensajes de los bot a los 2 mins
async function borrarMsg(msg) {
    if (msg.content.startsWith('!play ') || msg.content.startsWith('-play ') || msg.content.startsWith('!p ') || msg.content.startsWith('-p ')) {
        msg.suppressEmbeds();
    };
    if (msg.author.id == process.env.BOT_RYTHM || msg.author.id == process.env.BOT_GROOVY) {
        if (msg.content.startsWith('<:youtube:335112740957978625> **Searching**') || msg.content.startsWith('👍 **Joined**')) {
            msg.delete().catch();
        } else {
            setTimeout(() => {
                msg.delete().catch(); //.catch() para que no salga un error por consola si alguien borra el mensaje
            }, 120000); //Espera 2 minutos a eliminar los mensajes de los bots
        }
    }
};



module.exports = { borrarMsg };