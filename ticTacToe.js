
letras = [':regional_indicator_a:',
    ':regional_indicator_b:',
    ':regional_indicator_c:',
    ':regional_indicator_d:',
    ':regional_indicator_e:',
    ':regional_indicator_f:',
    ':regional_indicator_g:',
    ':regional_indicator_h:',
    ':regional_indicator_i:',
    ':regional_indicator_j:'];

/*

1) Saber qué 2 jugadores
2) decir cual es X y cual O
3) enviar tablero con emojis
4) esperar respuesta y comprobar el turno
5) editar el mensaje para mostrar la jugada
6) comprobar si hay un ganador
7) Eliminar partida

*/

function checkWinner(tablero) {
    //Comprobar :x:
    if (tablero[0] == [':x:', ':x:', ':x:'] || tablero[1] == [':x:', ':x:', ':x:'] || tablero[2] == [':x:', ':x:', ':x:']) {
        return true, 'ganador X'
    }
    if (tablero[0][0] == ':x:' && tablero[1][0] == ':x:' && tablero[2][0] == ':x:') {
        return true, 'ganador X'
    }
    if (tablero[0][1] == ':x:' && tablero[1][1] == ':x:' && tablero[2][1] == ':x:') {
        return true, 'ganador X'
    }
    if (tablero[0][2] == ':x:' && tablero[1][2] == ':x:' && tablero[2][2] == ':x:') {
        return true, 'ganador X'
    }
    if (tablero[0][0] == ':x:' && tablero[1][1] == ':x:' && tablero[2][2] == ':x:') {
        return true, 'ganador X'
    }
    if (tablero[0][2] == ':x:' && tablero[1][1] == ':x:' && tablero[2][0] == ':x:') {
        return true, 'ganador X'
    }
    //Comprobar :o:
    if (tablero[0] == [':o:', ':o:', ':o:'] || tablero[1] == [':o:', ':o:', ':o:'] || tablero[2] == [':o:', ':o:', ':o:']) {
        return true, 'ganador O'
    }
    if (tablero[0][0] == ':o:' && tablero[1][0] == ':o:' && tablero[2][0] == ':o:') {
        return true, 'ganador O'
    }
    if (tablero[0][1] == ':o:' && tablero[1][1] == ':o:' && tablero[2][1] == ':o:') {
        return true, 'ganador O'
    }
    if (tablero[0][2] == ':o:' && tablero[1][2] == ':o:' && tablero[2][2] == ':o:') {
        return true, 'ganador O'
    }
    if (tablero[0][0] == ':o:' && tablero[1][1] == ':o:' && tablero[2][2] == ':o:') {
        return true, 'ganador O'
    }
    if (tablero[0][2] == ':o:' && tablero[1][1] == ':o:' && tablero[2][0] == ':o:') {
        return true, 'ganador O'
    }
    //Comprobar si quedan jugadas
    for (let i = 0; i > 3; i++) {
        for (let j = 0; j > 3; j++) {
            if (tablero[i][j] == ':white_medium_square:') {
                return false, 'siguiente turno'
            }
        }
    }
    //Empate
    return true, 'empate'

};

