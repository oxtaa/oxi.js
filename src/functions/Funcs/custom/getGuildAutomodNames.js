module.exports = async (d) => {
    const data = d.util.aoiFunc(d);

    const [guildID = d.guild?.id, separator = ', '] = data.inside.splits;

    const guild = await d.util.getGuild(d, guildID);
    if (!guild) return d.aoiError.fnError(d, 'guild', { inside: data.inside });

    const rules = await guild.autoModerationRules.fetch();
    const names = rules.map((rule) => rule.name);

    const spacedNames = names.join(separator);

    data.result = spacedNames;

    return {
        code: d.util.setCode(data)
    };
};