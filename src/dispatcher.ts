/**
 * This file will handle all the Gateway Events, like READY, GUILD_CREATE, MESSAGE_CREATE, etc.
 */


import { warn, error, success, log, debug } from './fancyLogger';
import { BasicPayload, DiscordDispatchEvents, DiscordOpcodeResolved } from './types';
import { sendMessageOverHTTP } from './http';
import { user_id } from './config.json'; 

export const dispatchEventHandler = (event: DiscordDispatchEvents, data: BasicPayload) => {
    switch (event) {
        case "READY":
            debug("[Gateway Event] READY");
            debug("Connected as " + data.d.user.username + "#" + data.d.user.discriminator);
            break;
        case "RESUMED":
            debug("[Gateway Event] RESUMED");
            break;
        case "MESSAGE_CREATE":
            let message = data;
            debug("[Gateway Event] MESSAGE_CREATE");
            debug(data.d);
            debug(message.d.author.username + "#" + message.d.author.discriminator +" said: " + message.d.content);
            message.d.author.id === user_id ? 
            debug("Should probably not react to my own message!") 
            : sendMessageOverHTTP(message.d.channel_id, "hi mom!");

            // ignore other bots 
            message.d.author.bot ?
            debug("Ignoring bot message")
            : null;
            break;
        default: break;                    
    }
}