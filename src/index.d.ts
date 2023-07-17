import {Client, ShardingManager} from "discord.js";
import {Group} from "./classes/structures/dist/group/group";
import {LimitGroup} from "./classes/structures/dist/group/limitGroup";
import {SuperSet} from "./classes/structures/dist/sets/superset";
import {EventEmitter} from "events";

// Client options
type IntentOptions = "all" | string[];
type DatabaseOption<Database> = {
    type:
        | "default"
        | "dbdjs.db"
        | "aoi.db"
        | "dbdts.db"
        | "dbdjs.mongo"
        | "dbdjs.db-sql"
        | "aoi.fb"
        | "custom";
    db: Database;
    path?: string;
    tables?: Array<string>;
    extraOptions?: Record<string, any>;
    promisify?: boolean;
};
type RespondOnEditOptions = {
    commands?: boolean;
    alwaysExecute?: boolean;
    nonPrefixed?: boolean;
    time?: number;
};
type CacheOptions = Record<string, number | undefined | null>;
type EventOptions = {
    functionError?: boolean;
    timeout?: boolean;
};
type ClientOptions = {
    token: string;
    prefix: string | Array<string>;
    intents: IntentOptions;
    database?: DatabaseOption<any>;
    respondOnEdit?: RespondOnEditOptions;
    cache: CacheOptions;
    mobilePlatform?: boolean;
    fetchInvites?: {
        enabled: boolean;
        cacheInviters?: boolean;
    };
    suppressAllErrors?: boolean;
    errorMessage?: Array<string>;
    events?: EventOptions;
    disableFunctions?: Array<string>;
    autoUpdate?: boolean;
};

//AoiError
type ErrorMsg = string | Record<string, string | boolean | object | any[]>;
class AoiError {
    constructor();
    static CallbackError(callback: string, intent: string, line?: number): void;
    static CommandError(command: string, type: string, name: string, position?: number): void;
    static makeMessageError<Channel>(client: Bot, channel: Channel, message: ErrorMsg, options?: Record<string, unknown>): void;
    static consoleError(errorname: string, errorMsg: ErrorMsg): void;
    static functionErrorResolve<d>(d: d, type: string, object: object, message: ErrorMsg,): void;
    static fnError<d>(d: d, type: string, object: object, message: ErrorMsg): void;
}

//Blacklist
type BlacklistTypes = "globalUser" | "server" | "channel" | "role" | "user";
class Blacklist {
    constructor(client: Bot);
    setBlacklist(type: BlacklistTypes, errorMsg: ErrorMsg): void;
    blacklistIds(type: BlacklistTypes, ids: string[]): void;
    whitelistIds(type: BlacklistTypes, ids: string[]): void;
    get types(): BlacklistTypes;
    getBlacklistTable(type: "all" | "globalUser" | "server" | "channel" | "role" | "user"): string;
}

// Commands
interface BaseCommand {
    code: string;
}
interface EventCommand extends BaseCommand {
    name?: string;
    channel?: string;
    [key: string]: any;
}
interface Command extends BaseCommand {
    name: string;
    aliases?: string | Array<string>;
    async?: boolean;
    whitelist?: boolean;
    nonPrefixed?: boolean;
    error?: string;
}
interface AwaitCommand extends BaseCommand {
    name: string;
}
interface InteractionCommand extends BaseCommand {
    name: string | Array<string>;
    prototype: "application" | "button" | "selectMenu";
}
interface CustomEventCommand extends BaseCommand {
    name: string;
    listen: string;
}
interface LoopCommand extends BaseCommand {
    every: number;
    channel?: string;
    executeOnStartup?: boolean;
}

// Status object
type StatusOption = {
    text: string;
    url?: string;
    time: number;
    shardId?: number;
    type:
        | "PLAYING"
        | "LISTENING"
        | "WATCHING"
        | "STREAMING"
        | "playing"
        | "listening"
        | "streaming"
        | "watching";
};

declare class BaseClient extends Client {
    aoiOptions: Record<string, any>;
    interactionManager: InteractionManager;
    cacheManager: CacheManager;
    variableManager: any /*VariableManager*/;
    blacklist: Blacklist;
    prefix: string | string[];
    db: any /*AoijsAPI | DbdTsDb | CustomDb | Promisify*/;
    statuses: Group;
    constructor(options: ClientOptions);
    status(d: StatusOption[]): void;
    variables(data: object, table?: string): void;
}

declare class Bot extends BaseClient {
    cmd: CommandManager;
    functionManager: FunctionManager;
    constructor(options: ClientOptions);
    command(d: Command): void;
    awaitedCommand(d: AwaitCommand): void;
    deletedCommand(d: EventCommand): void;
    updateCommand(d: EventCommand): void;
    bulkDeleteCommand(d: EventCommand): void;
    guildJoinCommand(d: EventCommand): void;
    guildLeaveCommand(d: EventCommand): void;
    guildUpdateCommand(d: EventCommand): void;
    guildUnavailableCommand(d: EventCommand): void;
    roleCreateCommand(d: EventCommand): void;
    roleUpdateCommand(d: EventCommand): void;
    roleDeleteCommand(d: EventCommand): void;
    channelCreateCommand(d: EventCommand): void;
    channelUpdateCommand(d: EventCommand): void;
    channelDeleteCommand(d: EventCommand): void;
    channelPinsUpdateCommand(d: EventCommand): void;
    stageInstanceCreateCommand(d: EventCommand): void;
    stageInstanceUpdateCommand(d: EventCommand): void;
    stageInstanceDeleteCommand(d: EventCommand): void;
    threadCreateCommand(d: EventCommand): void;
    threadUpdateCommand(d: EventCommand): void;
    threadDeleteCommand(d: EventCommand): void;
    threadListSyncCommand(d: EventCommand): void;
    threadMemberUpdateCommand(d: EventCommand): void;
    joinCommand(d: EventCommand): void;
    leaveCommand(d: EventCommand): void;
    memberUpdateCommand(d: EventCommand): void;
    threadMembersUpdateCommand(d: EventCommand): void;
    memberAvailableCommand(d: EventCommand): void;
    membersChunkCommand(d: EventCommand): void;
    emojiCreateCommand(d: EventCommand): void;
    emojiDeleteCommand(d: EventCommand): void;
    emojiUpdateCommand(d: EventCommand): void;
    banAddCommand(d: EventCommand): void;
    banRemoveCommand(d: EventCommand): void;
    inviteCreateCommand(d: EventCommand): void;
    inviteDeleteCommand(d: EventCommand): void;
    reactionAddCommand(d: EventCommand): void;
    reactionRemoveCommand(d: EventCommand): void;
    reactionRemoveAllCommand(d: EventCommand): void;
    reactionRemoveEmojiCommand(d: EventCommand): void;
    presenceUpdateCommand(d: EventCommand): void;
    voiceStateUpdateCommand(d: EventCommand): void;
    interactionCommand(d: InteractionCommand): void;
    applicationCmdCreateCommand(d: EventCommand): void;
    applicationCmdDeleteCommand(d: EventCommand): void;
    applicationCmdUpdateCommand(d: EventCommand): void;
    userUpdateCommand(d: EventCommand): void;
    variableCreateCommand(d: EventCommand): void;
    variableDeleteCommand(d: EventCommand): void;
    variableUpdateCommand(d: EventCommand): void;
    readyCommand(d: EventCommand): void;
    functionErrorCommand(d: EventCommand): void;
    loopCommand(d: LoopCommand): void;
    timeoutCommand(d: EventCommand): void;
    pulseCommand(d: EventCommand): void;
    rateLimitCommand(d: EventCommand): void;
    webhookUpdateCommand(d: EventCommand): void;
    onMessage(d?: { guildOnly?: boolean; respondToBot?: boolean }): void;
    onMessageDelete(): void;
    onMessageUpdate(): void;
    onMessageDeleteBulk(): void;
    onGuildJoin(): void;
    onGuildLeave(): void;
    onGuildUpdate(): void;
    onGuildUnavailable(): void;
    onRoleCreate(): void;
    onRoleUpdate(): void;
    onRoleDelete(): void;
    onChannelCreate(): void;
    onChannelUpdate(): void;
    onChannelDelete(): void;
    onChannelPinsUpdate(): void;
    onStageInstanceCreate(): void;
    onStageInstanceUpdate(): void;
    onStageInstanceDelete(): void;
    onThreadCreate(): void;
    onThreadUpdate(): void;
    onThreadDelete(): void;
    onThreadListSync(): void;
    onThreadMemberUpdate(): void;
    onThreadMembersUpdate(): void;
    onJoin(): void;
    onLeave(): void;
    onMemberUpdate(): void;
    onMemberAvailable(): void;
    onMembersChunk(): void;
    onEmojiCreate(): void;
    onEmojiDelete(): void;
    onEmojiUpdate(): void;
    onStickerCreate(): void;
    onStickerDelete(): void;
    onStickerUpdate(): void;
    onBanAdd(): void;
    onBanRemove(): void;
    onInviteCreate(): void;
    onInviteDelete(): void;
    onReactionAdd(): void;
    onReactionRemove(): void;
    onReactionRemoveAll(): void;
    onReactionRemoveEmoji(): void;
    onVoiceStateUpdate(): void;
    onPresenceUpdate(): void;
    onTypingStart(): void;
    onInteractionCreate(): void;
    onApplicationCmdCreate(): void;
    onApplicationCmdDelete(): void;
    onApplicationCmdUpdate(): void;
    onUserUpdate(): void;
    onVariableCreate(): void;
    onVariableDelete(): void;
    onVariableUpdate(): void;
    onRateLimit(): void;
    onWebhookUpdate(): void;
}

//cacheManager
type CacheTypes = "cache" | "limitCache" | "setCache";

declare class CacheManager {
    constructor(client: Bot);
    get types(): CacheTypes;
    _validType(type: string): boolean;
    createCache(type: "cache", name: string): Group;
    createCache(type: "limitCache", name: string): LimitGroup;
    createCache(type: "setCache", name: string): SuperSet;
    deleteCache(type: "cache", name: string): Group;
    deleteCache(type: "limitCache", name: string): LimitGroup;
    deleteCache(type: "setCache", name: string): SuperSet;
    static _DjsCacheManager(cache: CacheOptions): any;
}

// Shard Client
declare class ClientShard extends ShardingManager {
    file: string;
    client: Bot;
    constructor(file: string, options: object, client: Bot);
    onShardDisconnect(): void;
    onShardError(): void;
    onShardResume(): void;
    onShardReconnecting(): void;
    onShardReady(): void;
}

// Command Manager
declare class Command {
    [key: string]: any;
    __client__: Bot;
    constructor(d: object, client: Bot);
    serializeFunctions(): string[];
    serializeCode(): void | string[];
    toString(): string;
    toArray(): [string, any][];
    keys(): string[];
    values(): unknown[];
}

declare class CommandManager {
    client: Bot;
    customCmds?: Array<string>;
    constructor(client: Bot, formCommand?: boolean, customCmds?: string[]);
    get types(): string[];
    createCommand(d: any): void;
    formCommand(): void;
    formCustomCommand(customCmds: string[]): void;
}

// Function Manager
declare class FunctionManager {
    client: Bot;
    maps: Record<string, string[]>;
    functions: string[];
    cache: Group;
    interpreter: unknown;
    constructor(client: Bot);
    cacheFunctions(): void;
    createCustomFunction(data: Array<Record<string, any>>): void;
    findFunctions(code: string): string[];
    serializeCode(code: string): string[];
}

// LoadCommands
declare class LoadCommands {
    Client: Bot;
    AddToClient?: boolean;
    constructor(Client: Bot, AddToClient?: boolean);
    load(cmd: CommandManager, path: string, debug?: boolean): void;
    update(debug?: boolean): void;
    setColors(colors: object): void;
    get allColors(): object;
    get themes(): object;
}

class CustomEvent extends EventEmitter {
    client: Bot;
    commands: Group;
    constructor(client: Bot);
    command(d: CustomEventCommand): void;
    listen(event: string): void;
}

// Interaction Manager
type ApplicationOptionData = {
    type:
        | "SUB_COMMAND"
        | "SUB_COMMAND_GROUP"
        | "STRING"
        | "INTEGER"
        | "BOOLEAN"
        | "USER"
        | "CHANNEL"
        | "ROLE"
        | "MENTIONABLE"
        | "NUMBER"
        | number;
};
type ApplicationData = {
    data: {
        name: string;
        description: void | string;
        options?: object[];
        type?: "CHAT_INPUT" | "USER" | "MESSAGE";
        defaultPermission?: boolean;
    };
    guildId?: string;
};
declare class Interaction extends EventEmitter {
    client: Bot;
    constructor(client: Bot);
    resolve<Interaction>(interaction: Interaction): Interaction;
}
declare class InteractionManager extends Interaction {
    client: Bot;
    awaitComponents: unknown /*Await*/;
    componentCollector: unknown /*CustomCollector*/;
    buttonData: Group;
    applicationData: Group;
    selectMenuData: Group;
    constructor(client: Bot);
    createApplicationData(d: ApplicationData): void;
    createButtonData(d: object): void;
    createSelectMenuData(d: object): void;
    stringifyApplicationData(name: string): string;
    resolveButtonData(name: string): string;
    resolveSelectMenuData(name: string): string;
    resolveSelectMenuOptionData(options: object[]): string;
    get buttonDataLength(): number;
}
