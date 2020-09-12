const fs = require('fs');
const mat = require('../extra/minsAtxt.js');


//Envia una lista con el tiempo jugado a cada juego
async function tiempoJuegos(msg) {
    if (msg.content.toLowerCase() == '.tiempo') {
        msg.channel.send(await stringTiempos(msg.author.id));
    } else if (msg.content.toLowerCase().startsWith('.tiempo')) {
        let nombres = listaDeIDs(msg.content.toLowerCase().split('.tiempo ')[1]);
        if (nombres.length == 0) {
            msg.channel.send('Usuario incorrecto. El formato es: `.tiempo ` + `el principio del apodo`/`apodo entero`');
        } else {
            nombres.forEach(async n => {
                msg.channel.send(await stringTiempos(n));
            });
        }
    }
};


//Crea la lista de juegos y tiempos
function stringTiempos(userID) {
    let juegos = JSON.parse(fs.readFileSync('../data/juegos.json', 'utf-8'));
    let displayName = JSON.parse(fs.readFileSync('../data/nombres.json', 'utf-8'))[userID];
    let mensaje = '**@' + displayName + '** ha jugado a:\n';
    let total = 0;
    for (let key in juegos[userID]) {
        let value = juegos[userID][key];
        total += value;
        mensaje += '**' + key + '** : ' + mat.minsAtxt(value) + '\n';
    }
    mensaje += '> **TOTAL** : ' + mat.minsAtxt(total)
    return mensaje;
};


//Permite enviar la lista de otra persona enviando '.tiempo' + el inicio del apodo de otro usuario
function listaDeIDs(nombre) {
    let lista = [];
    let displayName = JSON.parse(fs.readFileSync('../data/nombres.json', 'utf-8'));
    for (let key in displayName) {
        let value = displayName[key];
        if (value.toLowerCase().startsWith(nombre)) {
            lista.push(key);
        }
    }
    return lista;
}



module.exports = { tiempoJuegos };