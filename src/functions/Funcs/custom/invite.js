module.exports = async d => {
    const data = d.util.aoiFunc(d);
    const [ invite, prop ] = data.inside.splits;

    if (!invite) return d.aoiError.fnError(d, 'custom', {}, `Invalid invite URL or code at [undefined]`);
    if (!prop) return d.aoiError.fnError(d, 'custom', {}, `Invalid property at [${invite};undefined]`);
    
    function checkCode(url) {
        const regex = /(?:https?:\/\/)?discord\.gg\//g;
        if (regex.test(url)) {
            return url.replace(regex, '');
        } else {
            return url;
        };
    };
    const code = checkCode(invite);
    try {
        const invData = await d.message.guild.invites.fetch(code);
        const properties = {
            code: invData.code,
            isTemporary: invData.temporary,
            guildID: invData.guildId,
            uses: invData.uses,
            maxUses: invData.maxUses,
            inviterID: invData.inviterId,
            channelID: invData.channelId,
            createdAt: invData.createdTimestamp,
            expiresAt: invData.expiresTimestamp
        };
        if (properties[prop] !== undefined) {
            data.result = properties[prop];
        } else {
            return d.aoiError.fnError(d, 'custom', {}, `Invalid property at [${invite};${prop}]`);
        };
    } catch (e) {
        return d.aoiError.fnError(d, 'custom', {}, `Invalid invite URL or code at [${invite};${prop}]`);
    };

    return {
        code: d.util.setCode(data)
    };
}