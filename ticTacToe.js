
let letrasDiscord = [':regional_indicator_a:', ':regional_indicator_b:', ':regional_indicator_c:', ':regional_indicator_d:', ':regional_indicator_e:', ':regional_indicator_f:', ':regional_indicator_g:', ':regional_indicator_h:', ':regional_indicator_i:', ':regional_indicator_j:', ':arrows_counterclockwise:'];

let letrasEmoji = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🔄']

const tableroInicio = [['◻', '◻', '◻'], ['◻', '◻', '◻'], ['◻', '◻', '◻']];



function checkWinner(tablero) {
    //Comprobar ❌
    if (tablero[0] == ['❌', '❌', '❌'] || tablero[1] == ['❌', '❌', '❌'] || tablero[2] == ['❌', '❌', '❌']) {
        return true, 'ganador ❌'
    }
    if (tablero[0][0] == '❌' && tablero[1][0] == '❌' && tablero[2][0] == '❌') {
        return true, 'ganador ❌'
    }
    if (tablero[0][1] == '❌' && tablero[1][1] == '❌' && tablero[2][1] == '❌') {
        return true, 'ganador ❌'
    }
    if (tablero[0][2] == '❌' && tablero[1][2] == '❌' && tablero[2][2] == '❌') {
        return true, 'ganador ❌'
    }
    if (tablero[0][0] == '❌' && tablero[1][1] == '❌' && tablero[2][2] == '❌') {
        return true, 'ganador ❌'
    }
    if (tablero[0][2] == '❌' && tablero[1][1] == '❌' && tablero[2][0] == '❌') {
        return true, 'ganador ❌'
    }
    //Comprobar ⭕
    if (tablero[0] == ['⭕', '⭕', '⭕'] || tablero[1] == ['⭕', '⭕', '⭕'] || tablero[2] == ['⭕', '⭕', '⭕']) {
        return true, 'ganador ⭕'
    }
    if (tablero[0][0] == '⭕' && tablero[1][0] == '⭕' && tablero[2][0] == '⭕') {
        return true, 'ganador ⭕'
    }
    if (tablero[0][1] == '⭕' && tablero[1][1] == '⭕' && tablero[2][1] == '⭕') {
        return true, 'ganador ⭕'
    }
    if (tablero[0][2] == '⭕' && tablero[1][2] == '⭕' && tablero[2][2] == '⭕') {
        return true, 'ganador ⭕'
    }
    if (tablero[0][0] == '⭕' && tablero[1][1] == '⭕' && tablero[2][2] == '⭕') {
        return true, 'ganador ⭕'
    }
    if (tablero[0][2] == '⭕' && tablero[1][1] == '⭕' && tablero[2][0] == '⭕') {
        return true, 'ganador ⭕'
    }
    //Comprobar si quedan jugadas
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (tablero[i][j] == '◻') {
                return false, 'siguiente turno'
            }
        }
    }
    //Empate
    return true, 'empate'
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
    console.log(tableroString)
    for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
            tableroArray[j][k] = tableroString.charAt(0)
            tableroString = tableroString.substring(1)
        }
    }
    console.log(tableroArray)
    return tableroArray
};

//checkWinner(tableroStrToArray('◻a◻b◻c\n◻d◻e◻f\n◻g◻h◻i'))



function cambiarTablero(emoji, XorO, message_tablero) {
    let tableroParaCambiar = tableroStrToArray(message_tablero)
    if (XorO == '❌') {
        if (emoji == '🇦') {
            if (tableroParaCambiar[0][0] == '◻') {
                tableroParaCambiar[0][0] = '❌'
            }
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇧') {
            if (tableroParaCambiar[0][1] == '◻') {
                tableroParaCambiar[0][1] = '❌'
            }
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇨') {
            if (tableroParaCambiar[0][2] == '◻') {
                tableroParaCambiar[0][2] = '❌'
            }
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇩') {
            if (tableroParaCambiar[1][0] == '◻') {
                tableroParaCambiar[1][0] = '❌'
            }
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇪') {
            if (tableroParaCambiar[1][1] == '◻') {
                tableroParaCambiar[1][1] = '❌'
            }
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇫') {
            if (tableroParaCambiar[1][2] == '◻') {
                tableroParaCambiar[1][2] = '❌'
            }
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇬') {
            if (tableroParaCambiar[2][0] == '◻') {
                tableroParaCambiar[2][0] = '❌'
            }
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇭') {
            if (tableroParaCambiar[2][1] == '◻') {
                tableroParaCambiar[2][1] = '❌'
            }
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇮') {
            if (tableroParaCambiar[2][2] == '◻') {
                tableroParaCambiar[2][2] = '❌'
            }
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🔄') {
            return 'Jugador ❌ ha reiniciado'
        }
    }
    if (XorO == '⭕') {
        if (emoji == '🇦') {
            if (tableroParaCambiar[0][0] == '◻') {
                tableroParaCambiar[0][0] = '⭕'
            }
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇧') {
            if (tableroParaCambiar[0][1] == '◻') {
                tableroParaCambiar[0][1] = '⭕'
            }
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇨') {
            if (tableroParaCambiar[0][2] == '◻') {
                tableroParaCambiar[0][2] = '⭕'
            }
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇩') {
            if (tableroParaCambiar[1][0] == '◻') {
                tableroParaCambiar[1][0] = '⭕'
            }
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇪') {
            if (tableroParaCambiar[1][1] == '◻') {
                tableroParaCambiar[1][1] = '⭕'
            }
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇫') {
            if (tableroParaCambiar[1][2] == '◻') {
                tableroParaCambiar[1][2] = '⭕'
            }
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇬') {
            if (tableroParaCambiar[2][0] == '◻') {
                tableroParaCambiar[2][0] = '⭕'
            }
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇭') {
            if (tableroParaCambiar[2][1] == '◻') {
                tableroParaCambiar[2][1] = '⭕'
            }
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🇮') {
            if (tableroParaCambiar[2][2] == '◻') {
                tableroParaCambiar[2][2] = '⭕'
            }
            return tableroConLetras(tableroParaCambiar)
        }
        if (emoji == '🔄') {
            return 'Jugador ⭕ ha reiniciado'
        }
    }
};

//console.log(cambiarTablero('🇭', '⭕', '◻a◻b◻c\n◻d◻e◻f\n◻g◻h◻i'))



/*

1) Saber qué 2 jugadores
2) decir cual es X y cual O
3) enviar tablero con emojis
4) esperar respuesta y comprobar el turno
5) editar el mensaje para mostrar la jugada
6) comprobar si hay un ganador
7) Eliminar partida

1) recibe .ttt
2) devolver mensaje: el que envió .ttt es la ❌. Reacciona j2 con ⭕
3) cuando recibe la respuesta: elimina el mensaje anterior
4) envia el tablero en blanco y añade los 10 emotes (9 letras + reset)
5) espera a una reacción. la procesa (comprueba si es jugada válida y si hay ganador) y edita 
   el mensaje con el nuevo tablero
6) cuando hay ganador, borra el mensaje del tablero y envía otro diciendo quién ha sido el ganador

*/

/*

// Estructura
on message == .ttt,
    -.send(iniciarPartida(userID, msg_channel))

iniciarPartida():
    - nueva clase => this.userID ; UserID = X
    - msg_channel.send('j1 = X; j2 reacciona con O; empieza X')
    - .then(clase => this.messageID; UserID2 = O; turnoDe = UserID)

- .onreaction (if emoji = 'O' && messageID = clase.messageID)
    - => this.userID2 = userID
    -.then( borrar mensaje)
    -.then(.send(tablero)) ///
    -.then(clase => partidaActiva, messageID)

-.onreaction (if userID == clase.userID or ID2 && partidaActiva && messageId == esUnaPartida)
    - => tablero(emoji, message_channel)

*/
