let arrayC4 = [];
let numeros = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣'];
let tableroBlanco = [
    ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
    ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
    ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
    ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
    ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
    ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪']
];



//Al recibir '.c4' envia un mensaje para que se una un 2o jugador a la partida de conecta 4
function conecta4msg(msg) {
    if (msg.content == '.c4') {
        let userID = msg.member.id;
        let posicionInfo = isUserInArray(userID);
        if (posicionInfo[0] == true) { //Si está en el array, lo borra
            arrayC4.splice(posicionInfo[1], 1);
        }
        msg.channel.send('**CONECTA 4\n<@' + msg.member.id + '>** es 🟡 y empieza\n**Jugador 2**, reacciona al mensaje con 🔴')
            .then(function (men) {
                arrayC4.push(new conecta4(userID, men.channel));
                men.react('🔴');
            })
    }
};


//Comprueba que sea un jugador válido y lo une a la partida
function c4Emojis(reaction, user) {
    let posicionEmoji = isUserInArray(user.id);
    //jugador que está en partida activa
    if (user.bot == false && reaction.message.content.includes('**Jugador 2**, reacciona al mensaje con') && reaction._emoji.name == '🔴' && posicionEmoji[0]) {
        arrayC4.splice(posicionEmoji[1], 1); //lo borra de una partida activa
    }
    //jugador que no está en partida / acaba de ser borrado
    if (user.bot == false && reaction.message.content.includes('**Jugador 2**, reacciona al mensaje con') && reaction._emoji.name == '🔴' && !isUserInArray(user.id)[0]) {
        let pos = joinInArray(reaction.message.channel);
        arrayC4[pos].user2(user.id);
        reaction.message.delete()
            .then(reaction.message.channel.send(arrayToString(tableroBlanco))
                .then((msg) => {
                    arrayC4[pos].setMsgChannelTablero(msg);
                    addEmojis(msg);
                }))
            .then(reaction.message.channel.send('Turno de <@' + arrayC4[pos].turno[1] + '>')
                .then((msg2) => {
                    arrayC4[pos].setMsgChannelTurno(msg2);
                }))
        return;
    }
    //Jugador quiere hacer una jugada
    if (user.bot == false && numeros.indexOf(reaction._emoji.name) >= 0 && isMsgInArray(reaction.message, user.id)[0]) {
        let pos2 = isMsgInArray(reaction.message, user.id)[1]; //ex posInArray
        if (arrayC4[pos2].turno[1] == user.id) {
            let mensajeTablero = arrayC4[pos2].msg_tablero;
            mensajeTablero.edit(arrayToString(addFicha(arrayC4[pos2].tablero, reaction._emoji.name, arrayC4[pos2].turno, pos2)));
        }
    }
    return;
};


//Comprueba si el jugador está en alguna partida
function isUserInArray(userID) {
    for (let p = 0; p < arrayC4.length; p++) {
        let instancia = arrayC4[p];
        if (instancia.j1[0] == userID || instancia.j2[0] == userID) {
            return [true, p];
        }
    }
    return [false, undefined];
};


//Encuentra la posición del mensaje en el array donde estan todas las partidas (arrayC4)
function joinInArray(msgJoinOrTablero) {
    for (let p = 0; p < arrayC4.length; p++) {
        let instancia = arrayC4[p];
        if (instancia.joinGame == msgJoinOrTablero) { // || instancia.msg_tablero == msgJoinOrTablero) {
            return p;
        }
    }
    return;
};


// Pasa el tablero de array a string para poder enviarlo
function arrayToString(tablero) {
    let tableroSTR = '';
    let nums = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣'];
    for (let i = 0; i <= 5; i++) {
        for (let j = 0; j <= 6; j++) {
            tableroSTR += tablero[i][j];
        }
        tableroSTR += '\n';
    }
    for (let k = 0; k <= 6; k++) {
        tableroSTR += nums[k];
    }
    return tableroSTR;
}


//Añade los emojis 1-7
function addEmojis(msg) {
    for (let i = 0; i < 7; i++) {
        msg.react(numeros[i]);
    }
};


//Comprueba si es el mensaje correcto
function isMsgInArray(checkMsg, checkUserID) {
    for (let p = 0; p < arrayC4.length; p++) {
        let instancia = arrayC4[p];
        if (instancia.msg_tablero == checkMsg && (instancia.j1[0] == checkUserID || instancia.j2[0] == checkUserID)) {
            return [true, p];
        };
    };
    return [false, undefined];
};


//Cambia el tablero con la nueva jugada y comprueba ganador/empate/seguir_jugando
function addFicha(tablero, emojiColumna, turno, pos2) { //return tablero
    emojiColumna = numeros.indexOf(emojiColumna); // '3️⃣' = 2
    for (let y5 = 5; y5 >= 0; y5--) {
        if (tablero[y5][emojiColumna] == '⚪') {
            tablero[y5][emojiColumna] = turno[0];
            if (checkWinners(tablero, pos2)) {
                arrayC4[pos2].msg_turno.edit('Ha ganado <@' + turno[1] + '>');
                arrayC4.splice(pos2, 1);
            } else {
                arrayC4[pos2].cambioTurno();
                arrayC4[pos2].tablero = tablero;
            }
            return tablero;
        }
    }
    return tablero;
}


//Comprueba si hay ganador o empate
function checkWinners(tablero, pos2) {
    //comprobar diagonal
    for (let y = 0; y <= 2; y++) { // y = vertical
        for (let x = 0; x <= 3; x++) { //izquierda derecha '\'
            let ficha1 = tablero[y][x];
            let ficha2 = tablero[y + 1][x + 1];
            let ficha3 = tablero[y + 2][x + 2];
            let ficha4 = tablero[y + 3][x + 3];
            if (ficha1 == ficha2 && ficha2 == ficha3 && ficha3 == ficha4 && ficha1 != '⚪') {
                return true;
            }
        }
        for (let x2 = 0; x2 <= 3; x2++) { //derecha izquierda '/'
            let ficha1 = tablero[y][x2 + 3];
            let ficha2 = tablero[y + 1][x2 + 2];
            let ficha3 = tablero[y + 2][x2 + 1];
            let ficha4 = tablero[y + 3][x2];
            if (ficha1 == ficha2 && ficha2 == ficha3 && ficha3 == ficha4 && ficha1 != '⚪') {
                return true;
            }
        }
    }
    //comprobar vertical '|'
    for (let x3 = 0; x3 <= 6; x3++) {
        for (let y3 = 0; y3 <= 2; y3++) {
            let ficha1 = tablero[y3][x3];
            let ficha2 = tablero[y3 + 1][x3];
            let ficha3 = tablero[y3 + 2][x3];
            let ficha4 = tablero[y3 + 3][x3];
            if (ficha1 == ficha2 && ficha2 == ficha3 && ficha3 == ficha4 && ficha1 != '⚪') {
                return true;
            }
        }
    }
    //comprobar horizontal '-'
    for (let y4 = 0; y4 <= 5; y4++) {
        for (let x4 = 0; x4 <= 3; x4++) {
            let ficha1 = tablero[y4][x4];
            let ficha2 = tablero[y4][x4 + 1];
            let ficha3 = tablero[y4][x4 + 2];
            let ficha4 = tablero[y4][x4 + 3];
            if (ficha1 == ficha2 && ficha2 == ficha3 && ficha3 == ficha4 && ficha1 != '⚪') {
                return true;
            }
        }
    }
    //si quedan jugadas
    for (let y6 = 0; y6 <= 5; y6++) {
        for (let x6 = 0; x6 <= 6; x6++) {
            if (tablero[y6][x6] == '⚪') {
                return false;
            }
        }
    }
    //empate
    arrayC4[pos2].msg_turno.edit('Ha ganado <@' + turno[1] + '>');
    arrayC4.splice(pos2, 1);
    return false;
}



class conecta4 {
    constructor(userID, msgChannelSend) {
        this.j1 = [userID, '🟡'];
        this.j2 = ['userID2', '🔴'];
        this.turno = ['🟡', userID];
        this.joinGame = msgChannelSend;
        this.msg_tablero = '';
        this.msg_turno = '';
        this.tablero = [['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'], ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'], ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'], ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'], ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'], ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪']];
    }
    user2(usuario2ID) {
        this.j2[0] = usuario2ID;
    }
    cambioTurno() {
        if (this.turno[0] == '🟡') {
            this.turno = ['🔴', this.j2[0]];
            this.msg_turno.edit('Turno de <@' + this.turno[1] + '>');
        } else {
            this.turno = ['🟡', this.j1[0]];
            this.msg_turno.edit('Turno de <@' + this.turno[1] + '>');
        }
    }
    setMsgChannelTablero(msgTablero) {
        this.msg_tablero = msgTablero;
    }
    setMsgChannelTurno(msgTurno) {
        this.msg_turno = msgTurno;
    }
};



module.exports = { conecta4msg, c4Emojis, arrayC4 };