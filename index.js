const Discord    = require("discord.js");
const dotenv     = require('dotenv')
const fs         = require('fs')
const botconfig  = JSON.parse(fs.readFileSync('./src/botconfig.json', 'utf8'))
const talkedRecently = new Set();

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
console.log(Date.now() + " Ping Received");
response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

dotenv.config();

const bot = new Discord.Client({disableEveryone: true});

var eventpre = ""

bot.on('ready', async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity('Member ärgern!');

    var schedule = require('node-schedule');
    
    var dungeons = new schedule.RecurrenceRule();
    var feuerMontag = new schedule.RecurrenceRule();
    var feuerSonntaga = new schedule.RecurrenceRule();
    var feuerSonntagb = new schedule.RecurrenceRule();
    var eventank = new schedule.RecurrenceRule();
    var eventStart = new schedule.RecurrenceRule();
    var eventEnd = new schedule.RecurrenceRule();
    dungeons.dayOfWeek = [0,1,3,5];
    feuerMontag.dayOfWeek = [1];
    feuerSonntaga.dayOfWeek = [0];
    feuerSonntagb.dayOfWeek = [0];
    eventStart.dayOfWeek = [3];
    eventEnd.dayOfWeek = [3];
    dungeons.hour = 20;
    dungeons.minute = 30;
    feuerMontag.hour= 19;
    feuerMontag.minute = 30;
    feuerSonntaga.hour= 18;
    feuerSonntaga.minute = 30;
    feuerSonntagb.hour= 19;
    feuerSonntagb.minute = 30;
    eventank.hour = 17;
    eventank.minute = 30;
    eventStart.hour = 19;
    eventStart.minute = 52;
    eventEnd.hour = 19;
    eventEnd.minute = 55;


    var feuerMontagSend = schedule.scheduleJob(feuerMontag, function(){
        bot.channels.find("id","406802049464926218").send("Feuer bei German startet um 21.10 Uhr! \n!help für alle Botbefehle");
    });

    var feuerSonntagaSend = schedule.scheduleJob(feuerSonntaga, function(){
        bot.channels.find("id","406802049464926218").send("Unser Feuer startet um 19.00 Uhr! \n!help für alle Botbefehle");
    });

    var feuerSonntagbSend = schedule.scheduleJob(feuerSonntagb, function(){
        bot.channels.find("id","406802049464926218").send("Feuer bei DaBoyz startet um 20.00Uhr! \n!help für alle Botbefehle");
    });

    var dungeonSend = schedule.scheduleJob(dungeons, function(){
        bot.channels.find("id","406802049464926218").send("Unsere Dungeons starten um 21 Uhr! \n!help für alle Botbefehle");
    });

    var eventankSend = schedule.scheduleJob(eventank, function(){
        bot.channels.find("id","406802049464926218").send("Unsere Verlosung beginnt um 18 Uhr im Würfelchannel! \n!help für alle Botbefehle");
    });

    var eventStartSend = schedule.scheduleJob(eventStart, function(){
        eventpre = "$";
        
        let eventstartembed = new Discord.RichEmbed()
        

        .setDescription('**Event wurde gestartet**')
        .setColor('#42d1f4')
        .addField('Gewinne:', '- 2 Seiten Meteor \n- 1 Seite heilender Schlag \n - 1 mystisches Relikt')
        .addField('Ablauf:', 'Es kann nur einmal gewürfelt werden entweder Meteor, heilender Schlag oder das mystische Relikt. \n Also entscheidet Euch!')
        .addField('Befehle', '**$roll meteor** für eine Seite Meteor \n **$roll schlag** für eine Seite heilender Schlag \n **$roll relikt** für ein mystisches Relikt')
        .addField('Das Event endet in 30 Minuten', 'Viel Glück!');
        
        bot.channels.find("id","472292409863307274").send(eventstartembed);
    });

    var EventEndSend = schedule.scheduleJob(eventEnd, function(){
        eventpre = "";

        let eventendembed = new Discord.RichEmbed()
        .setDescription('**Event wurde beendet**')
        .setColor('#42d1f4')

        bot.channels.find("id","472292409863307274").send(eventendembed);
    });
    
});


bot.on('message', async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (message.content.startsWith ('$roll')) {
        message.delete().catch(O_o=>{});
    }

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(' ');
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (cmd === `${eventpre}roll`){
        message.delete().catch(O_o=>{});
        if (message.channel.id === '472292409863307274'){

            if (message.member.roles.some(r=>["Admin", "Mod", "Team", "Member"].includes(r.name)) ) {
            var wuerfel = Math.floor(Math.random() * 6) +1; 

                    if (message.content.startsWith('$roll meteor') || message.content.startsWith('$roll schlag') || message.content.startsWith('$roll relikt')){
                    

                        if (talkedRecently.has(message.author.id)) {
                                message.author.send("Du kannst pro Event nur einmal teilnehmen. - " + message.author);
                            } else {

                                if (message.content.startsWith('$roll meteor')){
                                    message.delete().catch(O_o=>{});
                                    message.channel.send(message.author + " hat eine " + "**"+wuerfel+"**" + " für eine Seite **Meteor** gewürfelt!"); 
                                }

                                if (message.content.startsWith('$roll schlag')){
                                    message.delete().catch(O_o=>{});
                                    message.channel.send(message.author + " hat eine " + "**"+wuerfel+"**" + " für eine Seite **heilender Schlag** gewürfelt!"); 
                                }

                                if (message.content.startsWith('$roll relikt')){
                                    message.delete().catch(O_o=>{});
                                    message.channel.send(message.author + " hat eine " + "**"+wuerfel+"**" + " für ein **mystisches Relikt** gewürfelt!"); 
                                } 

                                talkedRecently.add(message.author.id);
                                setTimeout(() => {
                                talkedRecently.delete(message.author.id);
                                }, 2100000);

                            }

                            }else{
                                return message.author.send(" Bitte wähle einen Preis mit $roll meteor, $roll schlag oder $roll relikt!");
                            }
            }else {
                return message.author.send(" du kannst diese Funktion nicht nutzen!");
            }
        }else {
            return message.author.send('Du befindest dich nicht im Würfelchannel!');
        }
    }
    

    if (cmd === `${prefix}serverinfo`){
        message.delete().catch(O_o=>{});

        let sicon = message.guild.iconURL;
        let serverinfoembed = new Discord.RichEmbed()
        .setDescription('Server Information')
        .setColor('#42d1f4')
        .setThumbnail(sicon)
        .addField('Server Name:', message.guild.name)
        .addField('Erstellt am:', message.guild.createdAt)
        .addField('Du bis beigetreten am:', message.member.joinedAt)
        .addField('Member auf dem Server:', message.guild.memberCount);

        return message.author.send(serverinfoembed);
    };

    if (cmd === `${prefix}feuer`){
        message.delete().catch(O_o=>{});

        let sicon = message.guild.iconURL;
        let feuerembed = new Discord.RichEmbed()
        .setDescription('Feuertermine')
        .setColor('#42d1f4')
        .setThumbnail(sicon)
        .addField('Montag:', '20.10 Uhr bei German')
        .addField('Sonntag:', '19.00 Uhr bei uns')
        .addField('Sonntag:', '20.00 Uhr bei DaBoyz');

        return message.author.send(feuerembed);
    };

    if (cmd === `${prefix}dungeons`){
        message.delete().catch(O_o=>{});

        let sicon = message.guild.iconURL;
        let dungeonembed = new Discord.RichEmbed()
        .setDescription('Dungeontermine')
        .setColor('#42d1f4')
        .setThumbnail(sicon)
        .addField('Montag:', '21.00 Uhr')
        .addField('Mittwoch:', '21.00 Uhr')
        .addField('Freitag:', '21.00 Uhr')
        .addField('Sonntag:', '18.30 Uhr');

        return message.author.send(dungeonembed);
    };


    if (cmd === `${prefix}botinfo`){
        message.delete().catch(O_o=>{});

        let bicon = bot.user.displayAvatarURL;
        let botinfoembed = new Discord.RichEmbed()
        .setDescription('Bot Information')
        .setColor('#42d1f4')
        .setThumbnail(bicon)
        .addField('Bot Name:', bot.user.username)
        .addField('Erstellt am', bot.user.createdAt);

        return message.author.send(botinfoembed);
    };


    if (cmd === `${prefix}help`){
        message.delete().catch(O_o=>{});
        
        let sicon = message.guild.iconURL;
        let helpembed = new Discord.RichEmbed()
        .setDescription('Botbefehle')
        .setColor('#42d1f4')
        .setThumbnail(sicon)
        .addField('Server Info:', '!serverinfo')
        .addField('Bot Info:', '!botinfo')
        .addField('Feuertermine:', '!feuer')
        .addField('Dungeontermine:', '!dungeons')
        .addField('Guides (deutsch):', '!guides_ger')
        .addField('Guides (englisch):', '!guides_en')
        .addField('Würfeln (wird automatisch bei Events freigegeben):', '$roll')
        .addField('Nachrichten löschen (nur Admins):', '!purge');

        return message.author.send(helpembed);
    };

    if (cmd === `${prefix}guides_ger`){
        message.delete().catch(O_o=>{});

        let sicon = message.guild.iconURL;
        let guides_ger = new Discord.RichEmbed()
        .setDescription('Deutsche Guides by Phenomica')
        .setColor('#42d1f4')
        .setThumbnail(sicon)
        .addField('Deutsche Guides:', "[Hier geht es zu der Playlist mit den Guides](https://www.youtube.com/watch?v=CqYaoQWNNZg&list=PLcuP9EAow45MIrAiufDe9W1VOEdltpMTf)");

        return message.author.send(guides_ger);   
    };

    if (cmd === `${prefix}guides_en`){
        message.delete().catch(O_o=>{});

        let sicon = message.guild.iconURL;
        let guides_en = new Discord.RichEmbed()
        .setDescription('Englische Guides by IceXgame')
        .setColor('#42d1f4')
        .setThumbnail(sicon)
        .addField('Tips & Tricks:', "[Hier geht es zu der Playlist](https://www.youtube.com/watch?v=u9zp0gvo3Z8&list=PL2fl77XDMGcAm2r-KXVPno158JEQkUxka)")
        .addField('Character Guide:', "[Hier geht es zu der Playlist](https://www.youtube.com/watch?v=q3wGz0hNLaI&list=PL2fl77XDMGcCRbx_GOtNuuHdn7eZDQD6Z)")
        .addField('Increase CP & PvP:', "[Hier geht es zu der Playlist](https://www.youtube.com/watch?v=N2ubkp7yHok&list=PL2fl77XDMGcDGexXP6n515hpojo0DaxAt)");

        return message.author.send(guides_en);   
    };

    if (cmd === `${prefix}purge`){
        message.delete().catch(O_o=>{});
        if (!message.member.roles.some(r=>["Admin"].includes(r.name)) )
          return message.author.send(" du hast keine Rechte um diese Funktion zu nutzen!")
            
          const deleteCount = parseInt(args[0], 10);
        
        if(!deleteCount || deleteCount < 2 || deleteCount > 100)
          return message.author.send("Bitte wähle die Anzahl der zu löschenden Nachrichten mit !purge 2-100");

        const fetched = await message.channel.fetchMessages({limit: deleteCount});
        message.channel.bulkDelete(fetched)
          .catch(error => message.reply(`Konnte Nachrichten nicht löschen: ${error}`));
  
  
    };
});

bot.login(process.env.TOKEN);