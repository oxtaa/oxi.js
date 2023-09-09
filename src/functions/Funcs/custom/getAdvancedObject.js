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
            const evaled = eval(`d.data.objects.${objName.addBrackets()}.${option}`)
            data.result = (typeof evaled === 'object' ? JSON.stringify(evaled, null, 2) : evaled) ?? 'undefined';
        } catch (e) {
            return d.aoiError.fnError(d, 'custom', {}, `Failed to get object with reason: ${e.message}`);
        }
    };

    return {
        code: d.util.setCode(data)
    }

}