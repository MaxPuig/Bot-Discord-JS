const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
require('dotenv').config({ path: '../.env' });
const client = new textToSpeech.TextToSpeechClient({ projectId: 'tts-nodejs-discord', keyFilename: process.env.PATHGOOGLE, });


// Descarga el audio desde Google
async function descargar_audio(displayName, userID) {
    const text = 'Se ha unido ' + displayName + ' a la llamada';
    const request = {
        input: { text: text },
        voice: { languageCode: 'es-ES', name: 'es-ES-Wavenet-B' },
        audioConfig: { audioEncoding: 'MP3', effectsProfileId: ['headphone-class-device'], pitch: -5, speakingRate: 1 }
    };
    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('./audioNombres/' + userID + '.mp3', response.audioContent, 'binary');
    //console.log('Audio content written to file: ' + userID + '.mp3');

    let datos = JSON.parse(fs.readFileSync('./data/nombresAudio.json', 'utf-8'));
    datos[userID] = [displayName, Math.floor(Date.now() / 1000)];
    fs.writeFileSync('./data/nombresAudio.json', JSON.stringify(datos));
}


//Si se ha unido alguien a un canal de voz (y no se ha desconectado) y no es un bot
function userJoined(oldMember, newMember) {
    if (oldMember.channelID != newMember.channelID && (newMember.channelID != null || newMember.channelID != undefined) && !newMember.member.user.bot) {
        let usersInChannel = 0;
        newMember.guild.members.cache.forEach(usuario => {
            if (!usuario.user.bot) {
                usersInChannel++;
            }
        });
        if (usersInChannel > 1) {
            playAudio(newMember);
        }
    }
}



async function playAudio(new_Member) {
    let voiceChannel = new_Member.channel;
    let currentDisplayName = new_Member.member.displayName;
    let currentTime = Math.floor(Date.now() / 1000);
    let displayName;
    let lastTime;
    let userID = new_Member.member.user.id;
    let nombreArchivo = await JSON.parse(fs.readFileSync('./data/nombresAudio.json', 'utf-8')); /// comprobar si existe
    try {
        displayName = nombreArchivo[userID][0];
        lastTime = nombreArchivo[userID][1];
    } catch { // Evita que el error salga por consola si no está en el .json
        lastTime = 0;
    }
    if (displayName != currentDisplayName) { // Si el nombre NO es el mismo que el del audio
        await descargar_audio(currentDisplayName, userID);
    }
    if (currentTime - lastTime > 9) { // Si han pasado más de 10 secs de la última vez que se ha reproducido
        voiceChannel.join().then(connection => {
            let dispatcher = connection.play('./audioNombres/' + userID + '.mp3');
            dispatcher.on('start', () => { });
            dispatcher.on('error', console.error);
            dispatcher.on('finish', function () {
                voiceChannel.leave();
            });
        }).catch(e => {
            console.error(e);
        });
    }
};



module.exports = { userJoined };