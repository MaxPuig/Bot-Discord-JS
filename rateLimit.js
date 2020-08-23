require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
let iter = 0;
let retraso = -100;
let tiempo = 500; //tiempo entre los primeros 5 mensajes
let retraso2 = 0; // tiempo entre mensajes después de los 5 mensajes



client.on('ready', async function () {
    console.log('Bot ready');
});



client.on('rateLimit', async function (rateLimitInfo) {
    console.log(rateLimitInfo);
    retraso = rateLimitInfo.timeout + 100;
    retraso2 += (rateLimitInfo.timeout / (iter / 5)) / 5;
});



client.on('message', async function (msg) {
    if (msg.content == 'a') {
        msg.channel.send('numeros')
            .then(async n => {
                await sleep(6000)
                editar(n)
            })
    };
});



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};



async function editar(msg) {
    for (let i = 0; i < 1000; i++) {
        await sleep(retraso + 100)
        await sleep(tiempo + retraso2)
        console.log(tiempo + retraso2)
        retraso = -100;
        msg.edit(i);
        iter++
    }
};



client.login(process.env.TOKENPY);