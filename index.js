require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const ttt = require('./ticTacToe.js');
const cines = require('./cineCartelera.js');
const tiempo = require('./sendGames.js');
const activity = require('./activity.js');
const borrar = require('./deleteBotEmbeds.js');



client.on('ready', async function () {
    console.log('Bot ready');
    while (true) {
        let guildID = process.env.GUILD_ID_SH;
        await activity.sleep(60000); // cada minuto
        activity.guardarInfo(client.guilds.cache.get(guildID).members.cache);
    }
});



client.on('message', async function (msg) {
    cines.cines(msg);
    ttt.ticTacToe(msg);
    tiempo.tiempoJuegos(msg);
    borrar.borrarMsg(msg);
    if (msg.content == '.backup') {
        msg.channel.send({ files: ["./data/nombres.json", "./data/juegos.json"] })
    };
});



client.on('messageReactionAdd', async (reaction, user) => {
    ttt.tttEmojis(reaction, user);
});



client.login(process.env.TOKENPY);