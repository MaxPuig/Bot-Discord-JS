//Pasa de un número (minutos) a formato dias/horas/minutos
function minsAtxt(minutos) {
    let mins = 0;
    let horas = 0;
    let dias = 0;
    let tiempo = '';
    if (minutos > 59) {
        mins = minutos % 60;
        horas = Math.floor(minutos / 60);
        if (horas > 23) {
            dias = Math.floor(horas / 24);
            horas = horas % 24;
        }
    } else {
        mins = minutos;
    }

    if (dias == 1) {
        tiempo += ' 1 día'
    } else if (dias > 1) {
        tiempo += ' ' + dias.toString() + ' días'
    }
    if (horas == 1) {
        tiempo += ' 1 hora'
    } else if (horas > 1) {
        tiempo += ' ' + horas.toString() + ' horas'
    } else if (dias != 0 && horas == 0) {
        tiempo += ' ' + horas.toString() + ' horas'
    }
    if (mins == 1) {
        tiempo += ' 1 minuto'
    } else if (mins > 1) {
        tiempo += ' ' + mins.toString() + ' minutos'
    } else if (dias != 0 || horas != 0 && mins == 0) {
        tiempo += ' ' + mins.toString() + ' minutos'
    }
    tiempo = tiempo.substr(1);
    return tiempo;
};



module.exports = { minsAtxt };