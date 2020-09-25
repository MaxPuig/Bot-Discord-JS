require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const ttt = require('./utils/ticTacToe.js');
const cines = require('./utils/cineCartelera.js');
const tiempo = require('./utils/sendGames.js');
const activity = require('./utils/activity.js');
const borrar = require('./utils/deleteBotEmbeds.js');
const voicePrank = require('./utils/voicePrank.js');
const peli = require('./utils/film.js');
const amongUs = require('./utils/amongUs.js');
const rss = require('./utils/rss.js');
const fs = require('fs');



client.on('ready', async function () {
    console.log('Bot ready');
    let i = 0;
    while (true) {
        let guildID = process.env.GUILD_ID_SH;
        let guildInfo = client.guilds.cache.get(guildID).members.cache;
        await activity.sleep(60000); // cada minuto
        activity.guardarInfo(guildInfo);
        voicePrank.doPrank(i, guildInfo);
        let Channel = undefined;
        try {
            let data = fs.readFileSync('./data/rssChannel.json', 'utf-8');
            data = JSON.parse(data);
            Channel = client.channels.cache.get(data);
        } catch (error) { }
        rss.sendRSS(i, Channel);
        i++;
    }
});



client.on('rateLimit', async function (rateLimitInfo) {
    peli.ratelimit(rateLimitInfo);
});



client.on('message', async function (msg) {
    if (msg.content.startsWith('.')) {
        cines.cines(msg);
        ttt.ticTacToe(msg);
        tiempo.tiempoJuegos(msg);
        peli.enviarPeli(msg);
        amongUs.amongUs(msg);
        rss.setRSSchannel(msg);
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