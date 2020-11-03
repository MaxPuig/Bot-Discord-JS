let Parser = require('rss-parser');
let parser = new Parser();
const fs = require('fs');


//Cada 15 mins, si hay una oferta nueva la envía
async function sendRSS(tiempo, channel) {
    if (channel == undefined || tiempo % 15 != 0) { //cada 15 mins
        //console.log('undefined channel')
        return;
    }
    try {
        let oferta = await freeFames();
        if (oferta.length > 0) {
            channel.send(oferta);
        }
    } catch (error) { }
};


//Establece el canal donde tiene que enviar los mensajes
function setRSSchannel(msg) {
    if (msg.content.startsWith('.rss')) {
        fs.writeFileSync('./data/rssChannel.json', JSON.stringify(msg.channel.id));
        msg.channel.send('Canal establecido');
    }
};


//Crea un string con las nuevas ofertas
async function freeFames() {
    let feed = await parser.parseURL('https://steamcommunity.com/groups/GrabFreeGames/rss/');
    let nombres;
    let link;
    let nombresNuevos = [];
    let mensaje = '';
    try {
        nombres = JSON.parse(fs.readFileSync('./data/freeGames.json', 'utf-8'));
    } catch (error) {
        nombres = [];
    }
    feed.items.forEach(item => {
        nombresNuevos.push(item.title);
        if (!nombres.includes(item.title)) {
            if (!mensaje.startsWith('**Nueva Oferta**')) {
                mensaje += '**Nueva Oferta**\n';
            }
            link = item.content;
            link = link.split('href=\"');
            link = link[1].split('"');
            link = link[0];
            if (link.startsWith('https://steamcommunity.com/linkfilter/?url=')) {
                link = link.split('https://steamcommunity.com/linkfilter/?url=')[1];
            }
            if (link.startsWith('https://store.epicgames.com/GRABFREEGAMES')) {
                link = link.replace('epicgames.com/GRABFREEGAMES/', 'epicgames.com/store/');
            }
            mensaje += item.title + '\n' + link + '\n\n';
        }
    });
    fs.writeFileSync('./data/freeGames.json', JSON.stringify(nombresNuevos));
    //console.log(mensaje)
    return mensaje;
};



module.exports = { sendRSS, setRSSchannel };