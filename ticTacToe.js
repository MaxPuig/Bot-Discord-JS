
let letras = [':regional_indicator_a:',
    ':regional_indicator_b:',
    ':regional_indicator_c:',
    ':regional_indicator_d:',
    ':regional_indicator_e:',
    ':regional_indicator_f:',
    ':regional_indicator_g:',
    ':regional_indicator_h:',
    ':regional_indicator_i:',
    ':regional_indicator_j:',
    ':arrows_counterclockwise:'];
let letrasEmoji = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🔄']

let tableroInicio = [['◻️', '◻️', '◻️'], ['◻️', '◻️', '◻️'], ['◻️', '◻️', '◻️']];
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
            if (tablero[i][j] == '◻️') {
                return false, 'siguiente turno'
            }
        }
    }
    //Empate
    return true, 'empate'
};

