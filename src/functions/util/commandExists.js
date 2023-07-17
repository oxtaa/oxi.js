/**
 * $commandExists
 * DESCRIPTION: Checks if the command exists by name and type.
 * USAGE: $commandExists[name;type]
 */
module.exports = async d => {
    const data = d.util.aoiFunc(d);
    const [name, type] = data.inside.splits;
    if (!name)
        return d.aoiError.fnError(d, "custom", {}, "Missing command name in");
    if (!d.client.cmd.types.includes(type))
        return d.aoiError.fnError(d, "custom", {}, "Invalid command type provided in");
    data.result = d.client.cmd[type].some(x => x.name.toLowerCase() === name.toLowerCase());
    return {
        code: d.util.setCode(data)
    };
};