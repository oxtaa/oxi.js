module.exports = d => {
    const data = d.util.aoiFunc(d);
    const [ objName, option, format = 'yes' ] = data.inside.splits;
    const getObj = d.data.objects;
    if (!objName) return d.aoiError.fnError(d, 'custom', {}, `Missing object name at [${data.inside.inside}]`);

    if (!option) {
        try {
            data.result = JSON.stringify(getObj[objName.addBrackets()], null, format === 'yes' ? 2 : 0);
        } catch (e) {
            data.result = 'undefined';
        };
    } else {
        try {
            const evaled = eval(`d.data.objects.${objName}.${option}`)
            data.result = (typeof evaled === 'object' ? JSON.stringify(evaled, null, format === 'yes' ? 2 : 0) : evaled) ?? 'undefined';
        } catch (e) {
            data.result = 'undefined';
        }
    };

    return {
        code: d.util.setCode(data)
    }

}