const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
require('dotenv').config();
//const fs = require('fs')


async function cinesInfo(pagina, dia) {
    let listaTitulos = '**Peliculas de ' + dia + ' en Cines Rotonda**';
    let j = 0;
    let datosWeb = await axios.request({
        method: 'GET',
        url: pagina,
        responseType: 'arraybuffer',
        responseEncoding: 'binary'
    });
    //fs.writeFileSync('cartelera.html', iconv.decode(datosWeb.data.toString('binary'), "ISO-8859-1"))
    const $ = await cheerio.load(iconv.decode(datosWeb.data.toString('binary'), "ISO-8859-1"));
    $('div.tableShowings').find('div.tableShowings').each((i, el) => {
        $(el).find('div.movieTitle').each((i, el) => {
            j++
            const item = $(el).text();
            listaTitulos = listaTitulos + '\n' + j + '. ' + item;
        });
        listaTitulos = listaTitulos + ' | ';
        $(el).find('div.movieTime').each((a, al) => {
            const hora = $(al).text();
            listaTitulos = listaTitulos + hora.slice(0, -1);
        })
    });
    //console.log(listaTitulos)
    return (listaTitulos);
};



cinesInfo(process.env.CINEC_HOY, 'HOY');