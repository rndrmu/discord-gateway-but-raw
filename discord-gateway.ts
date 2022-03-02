// connect to "wss://gateway.discord.gg/?v=9&encoding=json"
import fetch from 'node-fetch';
import WebSocket from 'ws';
import { DiscordGatewayEvent, DiscordOpcode, DiscordOpcodeResolved } from './types'
//import { gatewayCloseEvents } from './gatewayCloseEvents';

async function getGatewayUrl(token: string) {
    var gatewayUrl = await fetch('https://discord.com/api/v9/gateway/bot', {
        headers: {
            'Authorization': 'Bot ' + token
        }
    })
    console.log(gatewayUrl);
    return gatewayUrl.url;
}


var gatewayConnection = new WebSocket("wss://gateway.discord.gg/?v=9&encoding=json");
var token = ""; // your bot token here

gatewayConnection.onopen = () => {
    console.log('Gateway Connection Established');
}

gatewayConnection.onclose = (event) => {
    switch (event.code) {
        case 4000:
            console.log("[Gateway Closed] UNKNOWN ERROR");
            break;
        case 4001:
            console.log("[Gateway Closed] UNKNOWN OP CODE");
            break;
        case 4002:
            console.log("[Gateway Closed] DECODE ERROR");
            break;
        case 4003:
            console.log("[Gateway Closed] NOT AUTHENTICATED")
            break;
        case 4004:
            console.log("[Gateway Closed] AUTHENTICATION FAILED")
            break;
        case 4005:
            console.log("[Gateway Closed] ALREADY AUTHENTICATED")
            break;
        case 4007:
            console.log("[Gateway Closed] INVALID SEQUENCE")
            break;
        case 4008:
            console.log("[Gateway Closed] RATE LIMITED")
            break;
        case 4009:
            console.log("[Gateway Closed] SESSION TIMED OUT")
            break;
        case 4010:
            console.log("[Gateway Closed] INVALID SHARD")
            break;
        case 4011:
            console.log("[Gateway Closed] SHARDING REQUIRED")
            break;
        case 4012:
            console.log("[Gateway Closed] INVALID API VERSION")
            break;
        case 4013:
            console.log("[Gateway Closed] INVALID INTENTS")
            break;
        case 4014:
            console.log("[Gateway Closed] DISALLOWED GATEWAY INTENTS PROVIDED")
            break;
    }
    process.exit(0);
}

gatewayConnection.onmessage = (event: any) => {
    //console.log(event.data);
    var heartbeat_interval;
    var data = JSON.parse(event.data);
    switch (data.op) {
        case 0:
            console.log('Dispatch');
            console.log(data);
            let code = data.t;
            switch (code) {
                case "READY":
                    console.log("[Gateway Event] READY");
                    break;
                case "RESUMED":
                    console.log("[Gateway Event] RESUMED");
                    break;
                case "MESSAGE_CREATE":
                    console.log("[Gateway Event] MESSAGE_CREATE");
                    console.log(data.d.author.username + "#" + data.d.author.discriminator +" said: " + data.d.content);
                    break;
                default: break;                    
            }
            break;
        case 1:
            console.log('Heartbeat');
            break;
        case 2:
            console.log('Identify');
            break;
        case 3:
            console.log('Presence Update');
            break;
        case 4:
            console.log('Voice State Update');
            break;
        case 6:
            console.log('Resume');
            break;
        case 7:
            console.log('Reconnect');
            break;
        case 8:
            console.log('Request Guild Members');
            break;
        case 9:
            console.log('Invalid Session');
            break;
        case 10:
            console.log('%cHello', "color: yellow; font-weight: bold; font-size: 20px;");
            heartbeat_interval = data.d.heartbeat_interval;
            console.log('Heartbeat interval: ' + heartbeat_interval);
            let heartbeat_payload = JSON.stringify(heartbeat());
            gatewayConnection.send(JSON.stringify(heartbeat()));
            setInterval(() => {
                gatewayConnection.send(heartbeat_payload);
            }, heartbeat_interval);
            gatewayConnection.send(JSON.stringify(identifyToGateway(token)));
            break;
        case 11:
            console.log('Heartbeat ACK');
            break;
        default:
            console.log('Unknown op code: ' + data.op);
            break;

    }
}


/**
 * 
 * @param {*} token - Your Discord Bot Token
 * @returns Opcode 2 IDENTIFY Payload
 * @description Sends a Opcode 2 IDENTIFY to the Discord Gateway
 */
function identifyToGateway(token: string) {
    return {
        "op": 2,
        "d": {
          "token": token,
          "properties": {
            "$os": "linux",
            "$browser": "disco",
            "$device": "disco"
          },
          "compress": false,
          "large_threshold": 250,
          "shard": [0, 1],
          "presence": {
            "activities": [{
              "name": "The ACKs in the Console",
              "type": 3
            }],
            "status": "dnd",
            "since": 91879201,
            "afk": false
          },
          // This intent represents 1 << 0 for GUILDS, 1 << 1 for GUILD_MEMBERS, and 1 << 2 for GUILD_BANS
          // This connection will only receive the events defined in those three intents
          "intents": 1 << 7 | 1 << 9 | 1 << 10 | 1 << 11
        },
        "s": 42,
        "t": "IDENTIFY"
      }

}


/**
 * 
 * @returns Heartbeat Payload
 * @name heartbeat
 * @description Sends a Opcode 1 heartbeat to the Discord Gateway
 */
function heartbeat() {
    return {
        "op": 1,
        "d": {},
        "s": 42,
        "t": "HEARTBEAT"
    }
}