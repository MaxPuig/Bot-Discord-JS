require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const ttt = require('./ticTacToe.js');
const cines = require('./cineCartelera.js');



client.on('ready', function () {
    console.log('Bot ready');
});



client.on('message', async function (msg) {
    cines.cines(msg);
    ttt.ticTacToe(msg);
});



client.on('messageReactionAdd', async (reaction, user) => {
    ttt.tttEmojis(reaction, user);
});



client.login(process.env.TOKEN);