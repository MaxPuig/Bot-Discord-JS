const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
require('dotenv').config();



//Si recibe '.cine' envia un mensaje con la lista de películas para el día seleccionado (default el mismo dia)
async function cines(msg) {
    if (msg.content.toLowerCase().startsWith('.cine')) {
        msg.channel.send(await infoCineIndex(msg.content.toLowerCase()));
    }
};


//Crea el mensaje. Primero decide de qué día es la cartelera y si tiene que enviar la sinopsis
async function infoCineIndex(param) {
    if (param.split(' ').length == 1) {
        let mensaje = await cinesInfo(process.env.CINEC_HOY, 'HOY') + '\n \n' +
            '| sinopsis peli: `.cine {numero}` | mañana: `.cine m` | pasado: `.cine pm` |';
        return mensaje;
    }
    if (param.split(' ').length == 2) {
        if (param.split(' ')[1] == 'm') {
            let mensaje = await cinesInfo(process.env.CINEC_M, 'MAÑANA') + '\n \n' +
                '| sinopsis peli: `.cine m {numero}` | cartelera pasado mañana: `.cine pm` | sinopsis pasado mañana: `.cine pm {numero}` |';
            return mensaje;
        }
        if (param.split(' ')[1] == 'pm') {
            let mensaje = await cinesInfo(process.env.CINEC_PM, 'PASADO MAÑANA') + '\n \n' +
                '| sinopsis peli: `.cine pm {numero}` |';
            return mensaje;
        }
        if (!isNaN(param.split(' ')[1])) {
            return await sinopsis(process.env.CINEC_HOY, parseInt(param.split(' ')[1]));
        } else {
            return 'Lo has escrito mal. \nEJEMPLO: ".cine m" esto daría la cartelera de mañana. \nPara saber la de pasado mañana: ".cine pm" \nPara la sinopsis de la 3a peli de hoy: ".cine 3"';
        }
    }
    if (param.split(' ').length == 3) {
        if (param.split(' ')[1] == 'm' && !isNaN(param.split(' ')[2])) {
            return await sinopsis(process.env.CINEC_M, parseInt(param.split(' ')[2]));
        }
        if (param.split(' ')[1] == 'pm' && !isNaN(param.split(' ')[2])) {
            return await sinopsis(process.env.CINEC_PM, parseInt(param.split(' ')[2]));
        } else {
            return 'Lo has escrito mal. \nEJEMPLO: ".cine m 3" esto daría la sinopsis de la 3a peli de mañana. \npara saber la 3a de hoy: ".cine 3"';
        }
    }
};


//Accede a la web y enumera los resultados de películas
async function cinesInfo(pagina, dia) {
    let listaTitulos = '**Peliculas de ' + dia + ' en Cines Rotonda**';
    let j = 0;
    let datosWeb = await axios.request({
        method: 'GET',
        url: pagina,
        responseType: 'arraybuffer',
        responseEncoding: 'binary'
    });
    const $ = await cheerio.load(iconv.decode(datosWeb.data.toString('binary'), "ISO-8859-1"));
    $('div.tableShowings').find('div.tableShowings').each((i, el) => {
        $(el).find('div.movieTitle').each((i, el) => {
            j++;
            const item = $(el).text();
            listaTitulos = listaTitulos + '\n' + j + '. ' + item;
        });
        listaTitulos = listaTitulos + ' | ';
        $(el).find('div.movieTime').each((a, al) => {
            const hora = $(al).text();
            listaTitulos = listaTitulos + hora.slice(0, -1);
        })
    });
    return (listaTitulos);
};


//Accede a la sinopsis de la web
async function sinopsis(pagina, num) {
    let descripcion = '**SINOPSIS**\n';
    let texto = [];
    let datosWeb = await axios.request({
        method: 'GET',
        url: pagina,
        responseType: 'arraybuffer',
        responseEncoding: 'binary'
    });
    const $ = await cheerio.load(iconv.decode(datosWeb.data.toString('binary'), "ISO-8859-1"));
    $('.tableShowings').find('div.movieInfo').each((i, el) => {
        const item = $(el).text();
        texto.push(item);
    });
    return (descripcion + texto[num - 1]);
};



module.exports = { cines };