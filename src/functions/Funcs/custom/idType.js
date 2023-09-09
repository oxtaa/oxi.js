module.exports = d => {
    const data = d.util.aoiFunc(d);
    const [ id ] = data.inside.splits;
    let type;

    if (!id) return d.aoiError.fnError(d, 'custom', {}, `Missing ID at [${data.inside.inside}]`)

    const user = d.client.users.cache.get(id);
    if (user) {
        type = 'user';
    };
    const channel = d.client.channels.cache.get(id);
    if (channel) {
        type = 'channel';
    };
    const guild = d.client.guilds.cache.get(id);
    if (guild) {
        type = 'guild';
    };
    const role = d.guild.roles.cache.get(id);
    if (role) {
        type = 'role';
    };
    const emoji = d.client.emojis.cache.get(id);
    if (emoji) {
        type = 'emoji';
    };
    
    if (!type) return d.aoiError.fnError(d, 'custom', {}, `Invalid ID at [${data.inside.inside}]`)

    data.result = type;

    return {
        code: d.util.setCode(data)
    }
}