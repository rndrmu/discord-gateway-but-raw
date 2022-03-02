import { debug } from "./fancyLogger";

/**
 * In this file we will be handling all the websocket shit
 */

/**
 * 
 * @returns Heartbeat Payload
 * @name heartbeat
 * @description Sends a Opcode 1 heartbeat to the Discord Gateway
 */
export function heartbeat(seq_num: number) {
    debug("[Heartbeat] Sending heartbeat with sequence number: " + seq_num);
    return {
        "op": 1,
        "d": seq_num = 0 ? null! : seq_num++,
        "s": 42,
        "t": "HEARTBEAT"
    }
}


/**
 * 
 * @param {*} token - Your Discord Bot Token
 * @returns Opcode 2 IDENTIFY Payload
 * @description Sends a Opcode 2 IDENTIFY to the Discord Gateway
 */
export function identifyToGateway(token: string) {
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