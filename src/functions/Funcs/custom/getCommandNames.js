module.exports = d => {
    const data = d.util.aoiFunc(d);
    const [ type = 'default', separator = ', '] = data.inside.splits;

    if (!d.client.cmd.types.includes(type)) return d.aoiError.fnError(d, 'custom', {}, 'Invalid command type in [' + name + ';' + type + ']');

    const cmdInfo = d.client.cmd[type];
    const nameMap = cmdInfo.map(info => info.name).join(separator);

    if (!nameMap) return d.aoiError.fnError(d, 'custom', {}, 'Failed to fetch command names')
    
    data.result = nameMap;

    return {
        code: d.util.setCode(data)
    };
}