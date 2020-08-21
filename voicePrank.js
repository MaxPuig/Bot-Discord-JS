const fs = require('fs');



function doPrank(numero, guildInfo) {
    if (numero % 15 != 0) { //cada 15 mins
        return;
    }
    guildInfo.forEach(n => {
        if (n.voice.channel != null) {
            playAudio(n.voice.channel);
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
        dispatcher.on('start', () => {});
        dispatcher.on('error', console.error);
        dispatcher.on('finish', () => {
            voiceChannel.leave();
        });
    }).catch(e => {
        console.error(e);
    });
};



module.exports = { doPrank };