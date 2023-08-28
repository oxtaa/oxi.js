// added by oxta.
module.exports = async (d) => {
    const data = d.util.aoiFunc(d);
    const [userid = d.author?.id, guildid = d.guild?.id] = data.inside.splits;

    const guild = await d.util.getGuild(d, guildid);
    if (!guild) return d.aoiError.fnError(d, 'guild', {inside: data.inside});

    const member = await d.util.getMember(guild, userid);
    if (!member) return d.aoiError.fnError(d, 'member', {inside: data.inside});

    const rolePos = member.roles.cache.filter(role => role.color !== 0);
    const highestRole = rolePos.sort((a, b) => b.position - a.position).first();
    
    if (!highestRole) {
        data.result = "#" + 808080;
    } else {
        data.result = "#" + highestRole.color.toString(16);
    };
    return {
        code: d.util.setCode(data)
    };
}