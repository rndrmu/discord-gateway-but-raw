
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
    t: 'IDENTIFY'
};

export type BasicPayload = {
    op: DiscordOpcodeResolved;
    t: DiscordOpcode | null;
    d: any;
    s: number | null;
}

export type HelloPayload = {
    t: null,
    s: null,
    op: DiscordOpcodeResolved.HELLO,
    d: {
        heartbeat_interval: number;
        _trace: string[];
    }
}

export type ReadyPayload = {
    t: "READY",
    s: number,
    op: DiscordOpcodeResolved.DISPATCH,
    d: {
        v: number,
        user_settings: Object,
        user: {
            verified: boolean,
            username: string,
            mfa_enabled: boolean,
            id: string,
            flags: number,
            email: string | null, // can be null since bots don't have an email
            discriminator: string,
            bot: boolean,
            avatar: string,
        },
        shard: number[],
        session_id: string,
        relationships: any[], // usually empty, since bots cant be added as friends
        private_channels: any[],
        presences: any[],
        guilds: ReadyPayloadGuildArray[],
        guild_join_requests: any[],
        geo_ordered_rtc_regions: string[],
        application: {
            id: string,
            flags: number,
        },
        _trace: any[]
    }
}

export type MessagePayload = {
    t: "MESSAGE_CREATE",
    s: number,
    op: DiscordOpcodeResolved.DISPATCH,
    d: {
        type: number,
        tts: boolean,
        timestamp: Date,
        referenced_message: MessagePayload | null,
        pinned: boolean,
        nonce: string | null,
        mentions: Mention[],
        mention_roles: string[],
        mention_everyone: boolean,
        member: {
            roles: string[] | any[],
            nick: string | null,
            mute: boolean,
            joined_at: Date,
            hoisted_role: string | null,
            deaf: boolean,
        },
        id: string,
        flags: number,
        embeds: any[],
        edited_timestamp: Date | null,
        content: string,
        components: any[],
        channel_id: string,
        author: Mention,
        attachments: any[],
        guild_id: string,
    }
}

export type Mention = {
    username: string;
    public_flags: number;
    member: Object,
    id: string;
    discriminator: string;
    bot: boolean;
    avatar: string;
} 

export type ReadyPayloadGuildArray = {
    unavailable: boolean,
    id: string,
}


// this is probably retarded as fuck, but i dont care
export type DiscordDispatchEvents
= 'GUILD_CREATE' | 'GUILD_UPDATE' | 'GUILD_DELETE' | 'GUILD_ROLE_CREATE' | 'GUILD_ROLE_UPDATE'
| 'GUILD_ROLE_DELETE' | 'CHANNEL_CREATE' | 'CHANNEL_UPDATE' | 'CHANNEL_DELETE'
| 'CHANNEL_PINS_UPDATE' | 'THREAD_CREATE' | 'THREAD_UPDATE' | 'THREAD_DELETE'
| 'THREAD_LIST_SYNC' | 'THREAD_MEMBER_UPDATE' | 'THREAD_MEMBERS_UPDATE' 
| 'STAGE_INSTANCE_CREATE' | 'STAGE_INSTANCE_UPDATE' | 'STAGE_INSTANCE_DELETE'
| 'GUILD_MEMBER_ADD' | 'GUILD_MEMBER_REMOVE' | 'GUILD_MEMBER_UPDATE' | 'GUILD_MEMBERS_UPDATE'
| 'GUILD_BAN_ADD' | 'GUILD_BAN_REMOVE' | 'GUILD_EMOJIS_UPDATE' | 'GUILD_STICKERS_UPDATE'
| 'GUILD_INTEGRATIONS_UPDATE' | 'GUILD_INTEGRATION_CREATE' | 'GUILD_INTEGRATION_UPDATE' 
| 'GUILD_INTEGRATION_DELETE' | 'WEBHOOKS_UPDATE' | 'INVITE_CREATE' | 'INVITE_DELETE' 
| 'VOICE_STATE_UPDATE' | 'PRESENCE_UPDATE' | 'MESSAGE_CREATE' | 'MESSAGE_UPDATE' 
| 'MESSAGE_DELETE' | 'MESSAGE_DELETE_BULK' | 'MESSAGE_REACTION_ADD' | 'MESSAGE_REACTION_REMOVE'
| 'MESSAGE_REACTION_REMOVE_ALL' | 'MESSAGE_REACTION_REMOVE_EMOJI'
| 'TYPING_START' | 'GUILD_SCHEDULED_EVENT_UPDATE' | 'GUILD_SCHEDULED_EVENT_UPDATE'
| 'GUILD_SCHEDULED_EVENT_DELETE' | 'GUILD_SCHEDULED_EVENT_USER_ADD' | 'GUILD_SCHEDULED_EVENT_USER_REMOVE'
| 'READY' | 'RESUMED' | "INTERACTION_CREATE";