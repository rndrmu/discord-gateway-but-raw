import { error } from './fancyLogger';

export const gatewayError = (err: any) => {
    switch (err) {
        case 4000:
            error("[Gateway Closed] UNKNOWN ERROR");
            break;
        case 4001:
            error("[Gateway Closed] UNKNOWN OP CODE");
            break;
        case 4002:
            error("[Gateway Closed] DECODE ERROR");
            break;
        case 4003:
            error("[Gateway Closed] NOT AUTHENTICATED")
            break;
        case 4004:
            error("[Gateway Closed] AUTHENTICATION FAILED")
            break;
        case 4005:
            error("[Gateway Closed] ALREADY AUTHENTICATED")
            break;
        case 4007:
            error("[Gateway Closed] INVALID SEQUENCE")
            break;
        case 4008:
            error("[Gateway Closed] RATE LIMITED")
            break;
        case 4009:
            error("[Gateway Closed] SESSION TIMED OUT")
            break;
        case 4010:
            error("[Gateway Closed] INVALID SHARD")
            break;
        case 4011:
            error("[Gateway Closed] SHARDING REQUIRED")
            break;
        case 4012:
            error("[Gateway Closed] INVALID API VERSION")
            break;
        case 4013:
            error("[Gateway Closed] INVALID INTENTS")
            break;
        case 4014:
            error("[Gateway Closed] DISALLOWED GATEWAY INTENTS PROVIDED")
            break;
    }
    process.exit(0);
}