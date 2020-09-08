require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const ttt = require('./ticTacToe.js');
const cines = require('./cineCartelera.js');
const tiempo = require('./sendGames.js');
const activity = require('./activity.js');
const borrar = require('./deleteBotEmbeds.js');
const voicePrank = require('./voicePrank.js');
const peli = require('./film.js');
const amongUs = require('./amongUs.js')



client.on('ready', async function () {
    console.log('Bot ready');
    let i = 0;
    while (true) {
        let guildID = process.env.GUILD_ID_SH;
        let guildInfo = client.guilds.cache.get(guildID).members.cache;
        await activity.sleep(60000); // cada minuto
        activity.guardarInfo(guildInfo);
        voicePrank.doPrank(i, guildInfo);
        i++;
    }
});



client.on('rateLimit', async function (rateLimitInfo) {
    peli.ratelimit(rateLimitInfo);
});



client.on('message', async function (msg) {
    if(msg.content.startsWith('.')){
        cines.cines(msg);
        ttt.ticTacToe(msg);
        tiempo.tiempoJuegos(msg);
        peli.enviarPeli(msg);
        amongUs.amongUs(msg)
    };
    borrar.borrarMsg(msg);
    if (msg.content == '.backup') {
        msg.channel.send({ files: ["./data/nombres.json", "./data/juegos.json"] })
    };
});



client.on('messageReactionAdd', async (reaction, user) => {
    ttt.tttEmojis(reaction, user);
    amongUs.amongUsEmoji(reaction, user)
});



client.login(process.env.TOKENPY);