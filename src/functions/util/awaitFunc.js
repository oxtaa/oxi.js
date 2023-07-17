/**
 * $awaitFunc
 * DESCRIPTION: Calls an awaited command.
 * USAGE: $awaitFunc[awaited name]
 */
module.exports = async d => {
    const data = d.util.aoiFunc(d);
    if (data.err) return d.error(data.err);
    const [command] = data.inside.splits;
    if (!command) return d.aoiError.fnError(d, "custom", {}, "Missing awaited command provided.",)
    const cmd = d.client.cmd.awaited.find((x) => x.name.toLowerCase() === command.toLowerCase());
    if (!cmd) return d.aoiError.fnError(d, "custom", {},  `Invalid awaited command: '${command}' provided.`,);
    await d.interpreter(d.client, d.message, d.args, cmd, d.client.db, false, undefined, d.data);
    return {
        code: d.util.setCode(data)
    };
};