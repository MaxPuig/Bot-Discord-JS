require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', function () {
    console.log('Bot ready');
});



client.on('message', async function (msg) {
    //console.log(msg.content)
    if (msg.content.startsWith('!play ') || msg.content.startsWith('-play ')) {
        msg.suppressEmbeds();
    };
    if (msg.author.id == process.env.BOT_RYTHM || msg.author.id == process.env.BOT_GROOVY) {
        setTimeout(() => {
            msg.delete()
            if (msg.content.toLowerCase().startsWith('👍')) {
                msg.channel.send('Mansaje borrado. Ya basta de enviar tantos mensajes, Rythm bot <:haha:729754052925325384>').then(msg => {
                    setTimeout(() => {
                        msg.delete()
                    }, 5000);
                })
            }
        }, 120000);
    }
});



client.login(process.env.TOKENPY);