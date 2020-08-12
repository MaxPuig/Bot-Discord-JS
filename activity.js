require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();



client.on('ready', function () {
    let guildID = process.env.GUILD_ID_SH;
    console.log('Bot ready');
    client.guilds.cache.get(guildID).members.cache.forEach(n => {  //cada usuario que está en online
        if (n.user.presence.activities[0] != undefined) {
            if (n.user.presence.activities[0].name == 'Custom Status') {
                if (n.user.presence.activities.length > 1) {
                    console.log(n.displayName)
                    console.log(n.user.presence.activities[1].name)
                }
            } else {
                console.log(n.user.presence.activities[0].name)
            }
        }
    });
});



client.on('message', async function (msg) {
    if (msg.content.toLowerCase().startsWith('.a') && msg.author.bot == false) {
        msg.channel.send('<@' + msg.author.id + '> ' + 'Va bien'); //.reply
    }
});



client.login(process.env.TOKEN);