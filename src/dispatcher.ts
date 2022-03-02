/**
 * This file will handle all the Gateway Events, like READY, GUILD_CREATE, MESSAGE_CREATE, etc.
 */


import { warn, error, success, log, debug } from './fancyLogger';
import { BasicPayload, DiscordDispatchEvents, DiscordOpcodeResolved } from './types';
import { sendMessageOverHTTP, sendRawMessage } from './http';
import { user_id } from './config.json'; 
import { MessageEmbed } from './utils/MessageEmbed';

export const dispatchEventHandler = (event: DiscordDispatchEvents, data: BasicPayload) => {
    switch (event) {
        case "READY":
            success("[Gateway Event] READY");
            success("Connected as " + data.d.user.username + "#" + data.d.user.discriminator);
            break;
        case "RESUMED":
            debug("[Gateway Event] RESUMED");
            break;
        case "MESSAGE_CREATE":
            let message = data;
            debug("[Gateway Event] MESSAGE_CREATE");
            debug(data.d);
            debug(message.d.author.username + "#" + message.d.author.discriminator +" said: " + message.d.content);
            let message_content = message.d.content;
            
            switch (message_content.toLowerCase()) {
                case "!ping":
                    sendMessageOverHTTP(message.d.channel_id, "Pong!");
                    break;
                case "!hello":
                    sendMessageOverHTTP(message.d.channel_id, "Hello, " + message.d.author.username + "!");
                    break;
                case "!faithzone":
                    sendMessageOverHTTP(message.d.channel_id, "https://cdn.discordapp.com/attachments/739820346579877957/948302855218008074/faith_zone.mp4");
                    break;
                case "!cumzone":
                    sendMessageOverHTTP(message.d.channel_id, "cum \n\”https://cdn.discordapp.com/attachments/739820346579877957/948302840437297192/cum.webm");
                    break;
                case "!help": 
                    sendMessageOverHTTP(message.d.channel_id, "Commands: \n\!ping \n\!hello \n\!faithzone \n\!cumzone");
                    break;
                case "!embed": 
                    let embed = new MessageEmbed("Hello", "I am an embed", hex2int("#ff0000"));
                    sendRawMessage(message.d.channel_id, embed.toJSON());
                default: break;
            }

            message.d.author.id === user_id ? 
            debug("Should probably not react to my own message!") 
            : null;

            // ignore other bots 
            message.d.author.bot ?
            debug("Ignoring bot message")
            : null;
            break;
        default: break;                    
    }
}

function hex2int(hex: string) {
    return parseInt(hex, 16);
}