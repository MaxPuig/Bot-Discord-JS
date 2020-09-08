const fs = require('fs');
let titulo = '**Lista de jugadores:**\n(Pulsa el emoji para unirte)\n';



function amongUs(msg) {
    if (msg.content.toLowerCase().startsWith('.among us')) {
        msg.channel.send(titulo).then(function (msg) {
            jugadores = [];
            msg.react('⭕');
            fs.writeFileSync('./data/amongUsJugadores.json', JSON.stringify(jugadores));
        });
    };
};



function amongUsEmoji(reaction, user) {
    if (user.bot == false && reaction._emoji.name == '⭕' && reaction.message.content.startsWith('**Lista de jugadores:**\n(Pulsa el emoji para unirte)')) {
        let jugadores = JSON.parse(fs.readFileSync('./data/amongUsJugadores.json', 'utf-8'));
        if (jugadores.includes(user.id)) {
            return;
        }
        jugadores.push(user.id);
        fs.writeFileSync('./data/amongUsJugadores.json', JSON.stringify(jugadores));
        reaction.message.edit(nombres(jugadores));
    }
};



function nombres(players) {
    let nombres = JSON.parse(fs.readFileSync('./data/nombres.json', 'utf-8'));
    let listaPlayers = titulo;
    let j = 1;
    for (let i = 0; i < players.length; i++) {
        listaPlayers += j + '. ' + nombres[players[i]] + '\n';
        j++;
    }
    return listaPlayers;
};



module.exports = { amongUs, amongUsEmoji };