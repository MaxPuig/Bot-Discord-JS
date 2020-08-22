# Bot Discord
Bot para Discord escrito en node.js
- Guarda el tiempo jugado a cada juego de todos los usuarios (el usuario tiene que tener visible el juego en Discord)
- Reproduce audios (.mp3) aleatorios cada 15 minutos si hay alguien en un canal de voz
- Elimina previsualizaciones de links cuando van dirigidas a un bot de música
- Elimina los mensajes de los bots de música (Rythm y Groovy) después de 2 minutos

## COMANDOS
- .ttt    > Empieza una partida del 3 en raya
- .cine   > Envía la cartelera del día de hoy
- .tiempo > Envía la lista de juegos y el tiempo jugado
- .backup > Envía los archivos "juegos.json" y "nombres.json"

## SETUP
- SSH al servidor que vas a usar
- instalar node.js y npm si no lo están:
```
sudo apt update
sudo apt install nodejs
sudo apt install npm

Con esto nos da la base! (Versión antigua)
Para subir de versión ya solo necesitamos npm

sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```
- Descargar los archivos del bot ```git clone https://github.com/MaxPuig/Bot-Discord-JS.git```
- Descargar los paquetes```git install```
- Crear el archivo .env ```sudo nano .env``` y ahí escribir con los propios datos:
(Seguramente no vayas a utilizar .cine porque no usaremos la misma página web. De momento deja los "CINEC" como están. En **QUITAR FUNCIONALIDADES** explico cómo quitar el .cine)
```
TOKENPY="Token.del.bot"
GUILD_ID_SH="Guild Id donde está el bot"
BOT_RYTHM="User ID del Bot Rythm"
BOT_GROOVY="User ID del Bot Groovy"
CINEC_HOY="Link de la cartelera de hoy"
CINEC_M="Link de la cartelera de mañana"
CINEC_PM="Link de la cartelera de pasado mañana"
```
- ```ctrl + x```, ```y```, ```enter ↵``` para guardar y salir del .env
- ```mkdir music``` crea la carpeta donde irán los audios (.mp3)
- (recomendado) usar scp para copiar los audios. Ejemplo: ```scp -i /Path/to/key -r /Path/to/carpeta-con-audios-en-ordenador-local usuario@ip.del.server:/home/ubuntu/Bot-Discord-JS```
- ```mkdir data```, ```cd data```, ```sudo nano nombres.json```, escribir ```{}```, ```ctrl + x```, ```y```, ```enter ↵```, ```sudo nano juegos.json```, escribir ```{}```, ```ctrl + x```, ```y```, ```enter ↵```, ```cd ..``` Con esto habremos creado la carpeta y los 2 archivos que faltaban

Listo!!! Ejecuta el bot con ```node index.js```
- Para parar el bot ```ctrl + c```

## QUITAR FUNCIONALIDADES
- Editar index.js ```sudo nano index.js```
- Para quitar **cine**: eliminar líneas 5, 29: ```const cines = require('./cineCartelera.js');```, ```cines.cines(msg);```
- Para quitar **audios**: eliminar líneas 9, 15, 21, 22: ```const voicePrank = require('./voicePrank.js');```, ```let i = 0;```, ```voicePrank.doPrank(i, guildInfo);```, ```i++;```
- Para quitar **3 en raya**: eliminar líneas 4, 30, 41: ```const ttt = require('./ticTacToe.js');```, ```ttt.ticTacToe(msg);```, ```ttt.tttEmojis(reaction, user);```
- Para que no borre previews de links dirigidos a bots ni mensajes de bots: eliminar líneas 8, 32: ```const borrar = require('./deleteBotEmbeds.js');```, ```borrar.borrarMsg(msg);```
- No explicaré cómo **no** guardar los tiempos de los juegos jugados :)
- ```ctrl + x```, ```y```, ```enter ↵``` para guardar y salir

## ERRORES
- En caso de ```Error: EACCES: permission denied, open './data/juegos.json'``` salir del bot con ```ctrl + c```, y ecribir, con el path correcto, ```sudo chmod -R 777 /home/ubuntu/Bot-Discord-JS```
- Posible error: no tener archivos de audio en la carpeta "./music". Solución: meter un archivo mp3 en la carpeta o quitar la funcionalidad (explicado arriba)
- iconv-lite pide actualización. Razón: escribir ```.cine```. Solución: ignorar o quitar la funcionalidad (explicado arriba)
- Errores con el ```.cine```. Solución: quitar la funcionalidad (explicado arriba) o editar el archivo "cineCartelera.js" a tu gusto
