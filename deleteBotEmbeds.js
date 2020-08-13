require('dotenv').config();



async function borrarMsg(msg){
    if (msg.content.startsWith('!play ') || msg.content.startsWith('-play ')) {
        msg.suppressEmbeds();
    };
    if (msg.author.id == process.env.BOT_RYTHM || msg.author.id == process.env.BOT_GROOVY) {
        setTimeout(() => {
            msg.delete();
            if (msg.content.toLowerCase().startsWith('👍')) {
                msg.channel.send('Mansaje borrado. Ya basta de enviar tantos mensajes, Rythm bot <:haha:729754052925325384>').then(msg => {
                    setTimeout(() => {
                        msg.delete();
                    }, 5000);
                })
            }
        }, 120000);
    }
};



module.exports = { borrarMsg };