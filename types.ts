
// THIS IS FOR SENDING DATA TO THE GATEWAY
export type DiscordOpcode = 
'DISPATCH' | 'HEARTBEAT' | 'IDENTIFY' | 'PRESENCE_UPDATE' | 'VOICE_STATE_UPDATE' | 'RESUME' | 'RECONNECT' | 
'REQUEST_GUILD_MEMBERS' | 'INVALID_SESSION' | 'HELLO' | 'HEARTBEAT_ACK';

export enum DiscordOpcodeResolved {
    DISPATCH = 0,
    HEARTBEAT = 1,
    IDENTIFY = 2,
    PRESENCE_UPDATE = 3,
    VOICE_STATE_UPDATE = 4,
    RESUME = 6,
    RECONNECT = 7,
    REQUEST_GUILD_MEMBERS = 8,
    INVALID_SESSION = 9,
    HELLO = 10,
    HEARTBEAT_ACK = 11
};

export enum GatewayEvents {
    READY = 0,


}

export interface DiscordGatewayEvent {
    op: DiscordOpcodeResolved;
    d: any;
    s: 0 | null;
    t: DiscordOpcode
};


let e: DiscordGatewayEvent = {
    op: DiscordOpcodeResolved.IDENTIFY,
    d: {},
    s: 0,
    t: 'HELLO'
};