let arrayTTT = [];
const tableroInicio = [['◻', '◻', '◻'], ['◻', '◻', '◻'], ['◻', '◻', '◻']];
const letters = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🔄'];



// client.on('message', async function (msg) ...
function ticTacToe(msg) {
    if (msg.content == '.ttt') {
        let userDisplayName = msg.member.displayName;
        let userID = msg.member.id;
        if (isUserInArray(userID)) {
            arrayTTT.splice(posUserInArray(userID), 1);
        }
        msg.channel.send('**' + msg.member.displayName + '** es la ❌ y empieza\n**Jugador 2**, reacciona al mensaje con ⭕')
            .then(function (men) {
                arrayTTT.push(new juegoTTT(userDisplayName, userID, men.channel));
                men.react('⭕');
            })
    }
};



// client.on('messageReactionAdd', async (reaction, user) ...
function tttEmojis(reaction, user) {
    if (user.bot == false && reaction.message.content.slice(-1) == '⭕' && reaction._emoji.name == '⭕' && isUserInArray(user.id)) {
        let pos3 = posUserInArray(user.id);
        if (arrayTTT[pos3].isActive == true) {
            arrayTTT.splice(pos3, 1); //lo borra de una partida activa
        }
    }
    if (user.bot == false && reaction.message.content.slice(-1) == '⭕' && reaction._emoji.name == '⭕' && !isUserInArray(user.id)) {
        let pos = posInArray(reaction.message.channel);
        arrayTTT[pos].isActive = true;
        arrayTTT[pos].user2(reaction.message.guild.member(user.id).displayName, user.id)
        reaction.message.delete()
            .then(reaction.message.channel.send(tableroConLetras(tableroInicio))
                .then((msg) => {
                    arrayTTT[pos].setMsgChannelEdit(msg);
                    addEmojis(msg)
                }))
    }
    if (user.bot == false && letters.indexOf(reaction._emoji.name) >= 0 && isMsgInArray(reaction.message, user.id)) {
        let pos2 = posInArray(reaction.message);
        if (arrayTTT[pos2].turno == user.id) {
            let mensajechannel = arrayTTT[pos2].msgChannelEdit;
            mensajechannel.edit(cambiarTablero(reaction._emoji.name, arrayTTT[pos2].turnoEmoji, tableroConLetras(arrayTTT[pos2].tablero), pos2));
            // edita el mensaje con tablero o reinicio. guarda reinicio o guarda tablero [[],[],[]];
            if (typeof arrayTTT[pos2].tablero == 'string') { // si pone 'reinicio'
                arrayTTT.splice(pos2, 1)
            } else {  // si hay tablero array
                if (checkWinner(arrayTTT[pos2].tablero)) {
                    arrayTTT[pos2].msgChannelSend.send(checkWinner(arrayTTT[pos2].tablero))
                    arrayTTT.splice(pos2, 1) // si hay ganador o empate
                }
            }
        }
    }
};



function isMsgInArray(checkMsg, checkUserID) {
    for (let p = 0; p < arrayTTT.length; p++) {
        let instancia = arrayTTT[p];
        if (instancia.msgChannelEdit == checkMsg && (instancia.usuario1ID == checkUserID || instancia.usuario2ID == checkUserID)) {
            return true
        }
    }
    return false
};



function isUserInArray(checkInfo) {
    for (let p = 0; p < arrayTTT.length; p++) {
        let instancia = arrayTTT[p];
        if (instancia.usuario1ID == checkInfo || instancia.usuario2ID == checkInfo) {
            return true
        }
    }
    return false
};



function posUserInArray(userID) {
    for (let p = 0; p < arrayTTT.length; p++) {
        let instancia = arrayTTT[p];
        if (instancia.usuario1ID == userID || instancia.usuario2ID == userID) {
            return p
        }
    }
    return
};



function posInArray(msgEditOrSend) {
    for (let p = 0; p < arrayTTT.length; p++) {
        let instancia = arrayTTT[p];
        if (instancia.msgChannelEdit == msgEditOrSend || instancia.msgChannelSend == msgEditOrSend) {
            return p
        }
    }
    return
};



function tableroConLetras(tablero) { // [[emojis],[emojis],[emojis]]
    let letrasABC = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    let tableroParaEnviar = '';
    for (let x = 0; x < 3; x++) {
        let fila = tablero[x]
        for (let y = 0; y < 3; y++) {
            tableroParaEnviar = tableroParaEnviar + fila[y] + letrasABC[0];
            letrasABC.shift()
        }
        tableroParaEnviar = tableroParaEnviar + '\n'
    }
    return tableroParaEnviar
};



function tableroStrToArray(message_content) {
    let tableroArray = [[], [], []];
    let tableroString = '';
    for (let i = 0; i < 9; i++) {
        if (message_content.charAt(0) == '\n') {
            message_content = message_content.substring(1)
        }
        tableroString = tableroString + message_content.charAt(0)
        message_content = message_content.substring(1)
        message_content = message_content.substring(1)
    }
    for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
            tableroArray[j][k] = tableroString.charAt(0)
            tableroString = tableroString.substring(1)
        }
    }
    return tableroArray
};



function guardarTablero(tableroSTR, pos2) {
    arrayTTT[pos2].tablero = tableroStrToArray(tableroSTR);
};



function addEmojis(msg_channel) {
    for (let i = 0; i < 10; i++) {
        msg_channel.react(letters[i])
    }
};



function cambiarTablero(emoji, turnoEmoji, message_tablero, pos2) {
    let tableroParaCambiar = tableroStrToArray(message_tablero);
    if (turnoEmoji == '❌') {
        if (emoji == '🇦') {
            if (tableroParaCambiar[0][0] == '◻') {
                tableroParaCambiar[0][0] = '❌'
                arrayTTT[pos2].cambioTurno()
            }
            guardarTablero(tableroConLetras(tableroParaCambiar), pos2);
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇧') {
            if (tableroParaCambiar[0][1] == '◻') {
                tableroParaCambiar[0][1] = '❌'
                arrayTTT[pos2].cambioTurno()
            }
            guardarTablero(tableroConLetras(tableroParaCambiar), pos2);
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇨') {
            if (tableroParaCambiar[0][2] == '◻') {
                tableroParaCambiar[0][2] = '❌'
                arrayTTT[pos2].cambioTurno()
            }
            guardarTablero(tableroConLetras(tableroParaCambiar), pos2);
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇩') {
            if (tableroParaCambiar[1][0] == '◻') {
                tableroParaCambiar[1][0] = '❌'
                arrayTTT[pos2].cambioTurno()
            }
            guardarTablero(tableroConLetras(tableroParaCambiar), pos2);
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇪') {
            if (tableroParaCambiar[1][1] == '◻') {
                tableroParaCambiar[1][1] = '❌'
                arrayTTT[pos2].cambioTurno()
            }
            guardarTablero(tableroConLetras(tableroParaCambiar), pos2);
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇫') {
            if (tableroParaCambiar[1][2] == '◻') {
                tableroParaCambiar[1][2] = '❌'
                arrayTTT[pos2].cambioTurno()
            }
            guardarTablero(tableroConLetras(tableroParaCambiar), pos2);
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇬') {
            if (tableroParaCambiar[2][0] == '◻') {
                tableroParaCambiar[2][0] = '❌'
                arrayTTT[pos2].cambioTurno()
            }
            guardarTablero(tableroConLetras(tableroParaCambiar), pos2);
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇭') {
            if (tableroParaCambiar[2][1] == '◻') {
                tableroParaCambiar[2][1] = '❌'
                arrayTTT[pos2].cambioTurno()
            }
            guardarTablero(tableroConLetras(tableroParaCambiar), pos2);
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇮') {
            if (tableroParaCambiar[2][2] == '◻') {
                tableroParaCambiar[2][2] = '❌'
                arrayTTT[pos2].cambioTurno()
            }
            guardarTablero(tableroConLetras(tableroParaCambiar), pos2);
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🔄') {
            arrayTTT[pos2].tablero = 'Jugador ❌ ha reiniciado';
            return 'Jugador ❌ ha reiniciado'
        }
    }
    if (turnoEmoji == '⭕') {
        if (emoji == '🇦') {
            if (tableroParaCambiar[0][0] == '◻') {
                tableroParaCambiar[0][0] = '⭕'
                arrayTTT[pos2].cambioTurno()
            }
            guardarTablero(tableroConLetras(tableroParaCambiar), pos2);
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇧') {
            if (tableroParaCambiar[0][1] == '◻') {
                tableroParaCambiar[0][1] = '⭕'
                arrayTTT[pos2].cambioTurno()
            }
            guardarTablero(tableroConLetras(tableroParaCambiar), pos2);
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇨') {
            if (tableroParaCambiar[0][2] == '◻') {
                tableroParaCambiar[0][2] = '⭕'
                arrayTTT[pos2].cambioTurno()
            }
            guardarTablero(tableroConLetras(tableroParaCambiar), pos2);
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇩') {
            if (tableroParaCambiar[1][0] == '◻') {
                tableroParaCambiar[1][0] = '⭕'
                arrayTTT[pos2].cambioTurno()
            }
            guardarTablero(tableroConLetras(tableroParaCambiar), pos2);
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇪') {
            if (tableroParaCambiar[1][1] == '◻') {
                tableroParaCambiar[1][1] = '⭕'
                arrayTTT[pos2].cambioTurno()
            }
            guardarTablero(tableroConLetras(tableroParaCambiar), pos2);
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇫') {
            if (tableroParaCambiar[1][2] == '◻') {
                tableroParaCambiar[1][2] = '⭕'
                arrayTTT[pos2].cambioTurno()
            }
            guardarTablero(tableroConLetras(tableroParaCambiar), pos2);
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇬') {
            if (tableroParaCambiar[2][0] == '◻') {
                tableroParaCambiar[2][0] = '⭕'
                arrayTTT[pos2].cambioTurno()
            }
            guardarTablero(tableroConLetras(tableroParaCambiar), pos2);
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇭') {
            if (tableroParaCambiar[2][1] == '◻') {
                tableroParaCambiar[2][1] = '⭕'
                arrayTTT[pos2].cambioTurno()
            }
            guardarTablero(tableroConLetras(tableroParaCambiar), pos2);
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇮') {
            if (tableroParaCambiar[2][2] == '◻') {
                tableroParaCambiar[2][2] = '⭕'
                arrayTTT[pos2].cambioTurno()
            }
            guardarTablero(tableroConLetras(tableroParaCambiar), pos2);
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🔄') {
            arrayTTT[pos2].tablero = 'Jugador ⭕ ha reiniciado';
            return 'Jugador ⭕ ha reiniciado'
        }
    }
};



function checkWinner(tablero, posicion) {
    //Comprobar ❌
    if (JSON.stringify(tablero[0]) == JSON.stringify(['❌', '❌', '❌']) || JSON.stringify(tablero[1]) == JSON.stringify(['❌', '❌', '❌']) || JSON.stringify(tablero[2]) == JSON.stringify(['❌', '❌', '❌'])) {
        return 'ganador ❌'
    }
    if (tablero[0][0] == '❌' && tablero[1][0] == '❌' && tablero[2][0] == '❌') {
        return 'ganador ❌'
    }
    if (tablero[0][1] == '❌' && tablero[1][1] == '❌' && tablero[2][1] == '❌') {
        return 'ganador ❌'
    }
    if (tablero[0][2] == '❌' && tablero[1][2] == '❌' && tablero[2][2] == '❌') {
        return 'ganador ❌'
    }
    if (tablero[0][0] == '❌' && tablero[1][1] == '❌' && tablero[2][2] == '❌') {
        return 'ganador ❌'
    }
    if (tablero[0][2] == '❌' && tablero[1][1] == '❌' && tablero[2][0] == '❌') {
        return 'ganador ❌'
    }
    //Comprobar ⭕
    if (JSON.stringify(tablero[0]) == JSON.stringify(['⭕', '⭕', '⭕']) || JSON.stringify(tablero[1]) == JSON.stringify(['⭕', '⭕', '⭕']) || JSON.stringify(tablero[2]) == JSON.stringify(['⭕', '⭕', '⭕'])) {
        return 'ganador ⭕'
    }
    if (tablero[0][0] == '⭕' && tablero[1][0] == '⭕' && tablero[2][0] == '⭕') {
        return 'ganador ⭕'
    }
    if (tablero[0][1] == '⭕' && tablero[1][1] == '⭕' && tablero[2][1] == '⭕') {
        return 'ganador ⭕'
    }
    if (tablero[0][2] == '⭕' && tablero[1][2] == '⭕' && tablero[2][2] == '⭕') {
        return 'ganador ⭕'
    }
    if (tablero[0][0] == '⭕' && tablero[1][1] == '⭕' && tablero[2][2] == '⭕') {
        return 'ganador ⭕'
    }
    if (tablero[0][2] == '⭕' && tablero[1][1] == '⭕' && tablero[2][0] == '⭕') {
        return 'ganador ⭕'
    }
    //Comprobar si quedan jugadas
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (tablero[i][j] == '◻') {
                return
            }
        }
    }
    //Empate
    return 'empate'
};



class juegoTTT {
    constructor(usuario1, usuario1ID, msgChannelSend) {
        this.usuario1 = usuario1;
        this.usuario1ID = usuario1ID;
        this.usuario1emoji = '❌';
        this.usuario2 = '';//usuario2;
        this.usuario2ID = '';//usuario2;
        this.usuario2emoji = '⭕';
        this.msgTablero = '';//msgTablero;
        this.turno = usuario1ID;//turno;
        this.turnoEmoji = '❌';
        this.tablero = [['◻', '◻', '◻'], ['◻', '◻', '◻'], ['◻', '◻', '◻']];
        this.msgChannelSend = msgChannelSend;
        this.msgChannelEdit = '';
        this.isActive = false;
    }
    user2(usuario2, usuario2ID) {
        this.usuario2 = usuario2;
        this.usuario2ID = usuario2ID;
    }
    cambioTurno() {
        if (this.turnoEmoji == '❌') {
            this.turno = this.usuario2ID;
            this.turnoEmoji = '⭕';
        } else {
            this.turno = this.usuario1ID;
            this.turnoEmoji = '❌';
        }
    }
    setMsgChannelEdit(msgChannelEdit) {
        this.msgChannelEdit = msgChannelEdit;
    }
};



module.exports = { ticTacToe, tttEmojis, arrayTTT };