require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');



client.on('ready', async function () {
    console.log('Bot ready');
    while (true) {
        let guildID = process.env.GUILD_ID_SH;
        await sleep(60000) // cada minuto
        guardarInfo(client.guilds.cache.get(guildID).members.cache)
    }
});



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};



async function guardarInfo(guildMembersCache) {

    let juegos = JSON.parse(fs.readFileSync('./data/juegos.json', 'utf-8', function (err, datos) { }))
    let nombres = JSON.parse(fs.readFileSync('./data/nombres.json', 'utf-8', function (err, datos) { }))
    guildMembersCache.forEach(n => {
        if (!n.user.bot) {  //cada usuario (no bot) que está online
            let usuarioID = n.user.id;
            let nombreApodo = n.displayName;
            nombres = editNames(usuarioID, nombreApodo, nombres)
            if (n.user.presence.activities[0] != undefined) { // si tiene actividad
                if (n.user.presence.activities[0].name == 'Custom Status') {
                    if (n.user.presence.activities.length > 1) { // si tiene actividad y custom status
                        juegos = editGame(usuarioID, n.user.presence.activities[1].name, juegos);
                    }
                } else { // si no tiene custom status y tiene actividad
                    juegos = editGame(usuarioID, n.user.presence.activities[0].name, juegos)
                }
            }
        }
    });
    fs.writeFileSync('./data/juegos.json', JSON.stringify(juegos), function (err) { });
    fs.writeFileSync('./data/nombres.json', JSON.stringify(nombres), function (err) { });
};



function editGame(userID, nombreJuego, juegosJSON) {
    let juegos = juegosJSON;
    if (juegos[userID] == undefined) {
        juegos[userID] = {}
    }
    if (juegos[userID][nombreJuego] == undefined) {
        juegos[userID][nombreJuego] = 1;
    } else {
        juegos[userID][nombreJuego]++
    }
    return juegos
}



function editNames(userID, displayName, nombresJSON) {
    if (nombresJSON[userID] != undefined) {
        nombresJSON[userID] = displayName;
    } else if (nombresJSON[userID] != displayName) {
        nombresJSON[userID] = displayName;
    }
    return nombresJSON
}



client.login(process.env.TOKEN);