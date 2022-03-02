import { debug } from "./fancyLogger";
const token = process.env.DISCORD_TOKEN!;
import fetch from "node-fetch";

export async function sendMessageOverHTTP(channel_id: string, message: string) {
    debug("Attempting to send message with content " + message);
    let options = {
        host: 'https://discord.com',
        path: '/api/v10/channels/' + channel_id + '/messages',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bot ' + token
        }
    };
    let res = await fetch(options.host + options.path, {
        method: options.method,
        headers: options.headers,
        body: JSON.stringify({
            "content": message
        })
    });
}

export async function sendRawMessage(channel_id: string, messageObj: any) {
    debug("Attempting to send message with content " + messageObj);
    let options = {
        host: 'https://discord.com',
        path: '/api/v10/channels/' + channel_id + '/messages',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bot ' + token
        }
    };

    let res = await fetch(options.host + options.path, {
        method: options.method,
        headers: options.headers,
        body: JSON.stringify(messageObj)
    });
}

export async function getGatewayUrl(token: string) {
    var gatewayUrl = await fetch('https://discord.com/api/v10/gateway/bot', {
        headers: {
            'Authorization': 'Bot ' + token
        }
    })

    return gatewayUrl.url;
}