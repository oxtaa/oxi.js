//added
const axios = require('axios');
module.exports = async d => {
    const data = d.util.aoiFunc(d);
    const [url, varName] = data.inside.splits;

    if (!url) return d.aoiError.fnError(d, 'custom', {}, `Invalid url at ${url}`);
    if (!varName) return d.aoiError.fnError(d, 'custom', {}, `A valid var name is required at [${url};undefined]`);
    
    try {
        const jsonData = await axios.get(url);
        const value = JSON.stringify(jsonData.data);

        d.vars[varName.addBrackets()] = value.addBrackets();
        d.data.vars = d.vars;
    } catch (error) {
        console.log(error)
        return d.aoiError.fnError(d, 'custom', {}, `Unexpected error when trying to make JSON request.`);
    }

    return {
        code: d.util.setCode(data),
        data: d.data
    }
}