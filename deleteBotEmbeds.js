require('dotenv').config();


//Elimina la preview de los links que van dirigidos a los bots de música y sus mensajes
async function borrarMsg(msg){
    if (msg.content.startsWith('!play ') || msg.content.startsWith('-play ')) {
        msg.suppressEmbeds();
    };
    if (msg.author.id == process.env.BOT_RYTHM || msg.author.id == process.env.BOT_GROOVY) {
        setTimeout(() => {
            msg.delete();
        }, 120000); //Espera 2 minutos a eliminar los mensajes de los bots
    }
};



module.exports = { borrarMsg };