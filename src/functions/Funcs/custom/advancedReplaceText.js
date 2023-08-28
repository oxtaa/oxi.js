module.exports = d => {
    const data = d.util.aoiFunc(d);
    const [ text, replacements ] = data.inside.splits;

    const list = replacements.split(',');

    let result = text;
    try {
        for (const pair of list) {
            const [ o, n ] = pair.split(':');
            const regex = new RegExp(o.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&').trim(), 'g');
            result = result.replace(regex, n.trim());
        }
    } catch (e) {
        console.log(e);
        return d.aoiError.fnError(d, 'custom', {}, `Invalid replacement at [${text};${replacements}]`);
    }

    data.result = result;
    return {
        code: d.util.setCode(data)
    };
}