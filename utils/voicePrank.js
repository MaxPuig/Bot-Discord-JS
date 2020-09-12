const fs = require('fs');


//Reproduce un audio aleatorio de './music' si hay alguien conectado a un voice channel
function doPrank(numero, guildInfo) {
    if (numero % 30 != 0) { //cada 30 mins
        return;
    }
    let j = 0;
    guildInfo.forEach(n => {
        if (n.voice.channel != null && j == 0) {
            playAudio(n.voice.channel);
            j++;
            return;
        }
    })
    return;
};



function playAudio(n_voice_channel) {
    let voiceChannel = n_voice_channel;
    let audio;
    voiceChannel.join().then(connection => {
        let files = fs.readdirSync('./music');
        while (true) {
            audio = files[Math.floor(Math.random() * files.length)];
            if (audio.endsWith('.mp3')) {
                break;
            }
        }
        let dispatcher = connection.play('./music/' + audio);
        dispatcher.on('start', () => { });
        dispatcher.on('error', console.error);
        dispatcher.on('finish', () => {
            voiceChannel.leave();
        });
    }).catch(e => {
        console.error(e);
    });
};



module.exports = { doPrank };