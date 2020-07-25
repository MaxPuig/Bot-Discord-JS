require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
//const fs = require('fs')
//const axios = require('axios')
//const cheerio = require('cheerio')


client.on('ready', function () {
    let guildID = process.env.GUILD_ID_SH;
    console.log('Bot ready \n'); //+ `Logged in as ${client.user.tag}!`
    let datos = '0';
    client.guilds.cache.get(guildID).members.cache.forEach(n => {
        if (n.user.presence.activities[0] != undefined || datos == 0) {
            let activity = n.user.presence.activities[0];
            //console.log(activity + ' ' + n.displayName);
            // n = id ; n.user.username ;  n.user.presence.activities[0] = juego
        }
    });
    guardarInfo();
    //fs.writeFile('extractos.json', JSON.stringify(datos), function (err) {})
});



function guardarInfo() {
    let nombreID = {};
    let tiempojuegos = { UsuarioPrueba: { JuegoPrueba1: 404 } };
    let guildID = process.env.GUILD_ID_SH;
    client.guilds.cache.get(guildID).members.cache.forEach(n => {
        nombreID[n.user.id] = [n.nickname, n.user.username];
        if (n.user.presence.activities[0] != undefined) {
            let nameGame = n.user.presence.activities[0].name;
            if (tiempojuegos != {}) {
                // /////hacía esto ////// console.log(Object.keys(tiempojuegos).length)
                //tiempojuegos.forEach(lista => {console.log(lista)});
            }
            tiempojuegos[n.user.id] = { nameGame: 45 };
            // n = id ; n.user.username ;  n.user.presence.activities[0] = juego
        }
    })
    //////// console.log(nombreID, tiempojuegos)
};



client.on('message', async function (msg) {
    if (msg.content.toLowerCase().startsWith('.tiempo') && msg.author.bot == false) {
        msg.channel.send('<@' + msg.author.id + '> ' + 'Va bien'); //.reply
    }
});



client.login(process.env.TOKEN);