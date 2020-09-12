require('dotenv').config({path: '../.env'});
const fs = require('fs');



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};


//Guarda el tiempo jugado a cada juego en ../data/juegos.json cada minuto
//Guarda el ID junto con el apodo/displayname en ../data/nombres.json
async function guardarInfo(guildMembersCache) {
    let juegos = JSON.parse(fs.readFileSync('../data/juegos.json', 'utf-8'));
    let nombres = JSON.parse(fs.readFileSync('../data/nombres.json', 'utf-8'));
    guildMembersCache.forEach(n => {
        if (!n.user.bot) {  //cada usuario (no bot) que está online
            let usuarioID = n.user.id;
            let nombreApodo = n.displayName;
            nombres = editNames(usuarioID, nombreApodo, nombres);
            if (n.user.presence.activities[0] != undefined) { // si tiene actividad
                if (n.user.presence.activities[0].name == 'Custom Status') {
                    if (n.user.presence.activities.length > 1) { // si tiene actividad y custom status
                        juegos = editGame(usuarioID, n.user.presence.activities[1].name, juegos);
                    }
                } else { // si no tiene custom status y tiene actividad
                    juegos = editGame(usuarioID, n.user.presence.activities[0].name, juegos);
                }
            }
        }
    });
    fs.writeFileSync('../data/juegos.json', JSON.stringify(juegos));
    fs.writeFileSync('../data/nombres.json', JSON.stringify(nombres));
};


//Actualiza los tiempos jugados al juego o crea el juego y lo pone a 1
function editGame(userID, nombreJuego, juegosJSON) {
    let juegos = juegosJSON;
    if (juegos[userID] == undefined) {
        juegos[userID] = {};
    }
    if (juegos[userID][nombreJuego] == undefined) {
        juegos[userID][nombreJuego] = 1;
    } else {
        juegos[userID][nombreJuego]++;
    }
    return juegos
};


//Actualiza/crea los nombres y los relaciona con el userID
function editNames(userID, displayName, nombresJSON) {
    if (nombresJSON[userID] != undefined) {
        nombresJSON[userID] = displayName;
    } else if (nombresJSON[userID] != displayName) {
        nombresJSON[userID] = displayName;
    }
    return nombresJSON
};



module.exports = { guardarInfo, sleep };