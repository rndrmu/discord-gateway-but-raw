// connect to "wss://gateway.discord.gg/?v=9&encoding=json"
import fetch from 'node-fetch';
import WebSocket from 'ws';
import { ReadyPayload, MessagePayload, HelloPayload } from './types'
import { warn, error, success, log, debug } from './fancyLogger';
import { identifyToGateway, heartbeat } from './websocket';
import { gatewayError } from "./gatewayCloseEvents";
import { sendMessageOverHTTP } from './http';
import { dispatchEventHandler } from './dispatcher';
//import { gatewayCloseEvents } from './gatewayCloseEvents';



// check that we have a valid token in the environment
if (!process.env.DISCORD_TOKEN) {
    error("Expected a Discord Token in the environment variable DISCORD_TOKEN");
    process.exit(1);
}


const gatewayConnection = new WebSocket("wss://gateway.discord.gg/?v=9&encoding=json");
const token = process.env.DISCORD_TOKEN! // use "export DISCORD_TOKEN=your_token" to set your token, windows users gtfo
const bot_id = "735822109179248663"; // your bot id here

/**
 * @name Sequence Number
 * @description The sequence number is used to identify how often we recived/sent data to the gateway.
 * @description The sequence number is incremented every time we send or receive data to/from the gateway.
 */
let sequence_num = 0;

gatewayConnection.onopen = (data) => {
    success("Gateway connection opened");
    debug("Connected to " + gatewayConnection.url);
}

gatewayConnection.onclose = (event) => gatewayError(event.code);

gatewayConnection.onmessage = (event: any) => {
    var heartbeat_interval;
    var data = JSON.parse(event.data);
    switch (data.op) {
        case 0:
            //console.log(data.d);
            debug('Dispatch Event Fired');
            
            let code = data.t;
            dispatchEventHandler(code, data);
            
            break;
        case 1:
            debug('Heartbeat');
            break;
        case 2:
            debug('Identify');
            break;
        case 3:
            debug('Presence Update');
            break;
        case 4:
            debug('Voice State Update');
            break;
        case 6:
            debug('Resume');
            break;
        case 7:
            debug('Reconnect');
            break;
        case 8:
            debug('Request Guild Members');
            break;
        case 9:
            debug('Invalid Session');
            break;
        case 10:
            debug('Hello');
            heartbeat_interval = data.d.heartbeat_interval;
            debug('Heartbeat interval: ' + heartbeat_interval);
            let heartbeat_payload = JSON.stringify(heartbeat(sequence_num));
            gatewayConnection.send(JSON.stringify(heartbeat(sequence_num)));
            setInterval(() => {
                debug("Sending heartbeat");
                gatewayConnection.send(heartbeat_payload);
            }, heartbeat_interval);
            gatewayConnection.send(JSON.stringify(identifyToGateway(token)));
            break;
        case 11:
            debug('Heartbeat Received');
            break;
        default:
            debug('Unknown op code: ' + data.op);
            break;

    }
}







