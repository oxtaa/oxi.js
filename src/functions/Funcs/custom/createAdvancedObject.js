module.exports = d => {
    const data = d.util.aoiFunc(d);
    const [ name, json ] = data.inside.splits;
    const newObj = d.vars;
    if (!name) return d.aoiError.fnError(d, 'custom', {}, `Missing object name at [${data.inside.inside}]`);
    if (!json) return d.aoiError.fnError(d, 'custom', {}, `Missing json at [${data.inside.inside}]`)

    let parsedJson;

    try {
        parsedJson = JSON.parse(json);
    } catch (e) {
        return d.aoiError.fnError(d, 'custom', {}, `Invalid JSON at [${data.inside.inside}]`)
    };

    newObj[name.addBrackets()] = parsedJson;
    d.data.objects = d.vars;

    return {
        code: d.util.setCode(data),
        data: d.data
    }
}