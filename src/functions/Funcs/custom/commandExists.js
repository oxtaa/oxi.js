module.exports = d => {
    const data = d.util.aoiFunc(d);
    const [ name, type = 'default' ] = data.inside.splits;

    if (!name) return d.aoiError.fnError(d, 'custom', {}, 'Missing command name at [undefined]');
    if (!d.client.cmd.types.includes(type)) return d.aoiError.fnError(d, 'custom', {}, 'Invalid command type in [' + name + ';' + type + ']');

    data.result = d.client.cmd[type].some(i => i.name.toLowerCase() === name.toLowerCase());

    return {
        code: d.util.setCode(data)
    };
}