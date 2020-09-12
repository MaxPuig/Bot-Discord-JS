const readline = require('readline');
const fs = require('fs');
let play = false;
let espera = 0;



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};


//'.peli' Envía la película editando un mensaje o lo para con '.stop'
async function enviarPeli(msg) {
    if (msg.content == '.peli') {
        play = false;
        msg.channel.send('Película de Star wars\nsi se ve mal, ctrl + "-"')
            .then(async n => {
                await sleep(6000);
                play = true;
                processLineByLine(n);
            })
    };
    if (msg.content.toLowerCase() == '.stop') {
        play = false;
    };
};



async function processLineByLine(msg) {
    const fileStream = fs.createReadStream('./extra/sw1.txt');
    let frame = '';
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    for await (const line of rl) {
        if (line.startsWith('0') || line.startsWith('1') || line.startsWith('2') || line.startsWith('3') || line.startsWith('4') || line.startsWith('5') || line.startsWith('6') || line.startsWith('7') || line.startsWith('8') || line.startsWith('9')) {
            await sleep(1350)
            await sleep(espera)
            espera = 0;
            msg.edit('```️\n' + frame + '️```\n```.stop para pararlo```')
            if (play == false) { //Comprueba si seguir
                return
            }
            frame = '';
        } else {
            frame += line + '\n'
        };
    };
};


//Si supera el ratelimit, pone el bot en pausa por 5 segundos (se ejecuta desde index.js)
function ratelimit(rateMessage) {
    if (rateMessage.timeout != 0) {
        espera = 5000;
    };
};



module.exports = { enviarPeli, ratelimit };