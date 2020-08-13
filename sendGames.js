const fs = require('fs');
const mat = require('./minsAtxt.js');



async function tiempoJuegos(msg) {
    if (msg.content.toLowerCase().startsWith('.tiempo') && msg.author.bot == false) {
        msg.channel.send(await stringTiempos(msg.author.id));
    }
};



function stringTiempos(userID) {
    let juegos = JSON.parse(fs.readFileSync('./data/juegos.json', 'utf-8', function (err, datos) { }));
    let displayName = JSON.parse(fs.readFileSync('./data/nombres.json', 'utf-8', function (err, datos) { }))[userID];
    let mensaje = '**@' + displayName + '** ha jugado a:\n';
    let total = 0;
    for (let key in juegos[userID]) {
        let value = juegos[userID][key];
        total += value;
        mensaje += '**' + key + '** : ' + mat.minsAtxt(value) + '\n';
    }
    mensaje += '**TOTAL** : ' + mat.minsAtxt(total)
    return mensaje;
};



module.exports = { tiempoJuegos };