//added
const m = require('mathjs');
module.exports = async d => {
    data = d.util.aoiFunc(d);
    const [num1, num2] = data.inside.splits
    if (!num1) return d.aoiError.fnError(d, 'custom', {}, `Invalid number at ${num1}`);
    if (!num2) return d.aoiError.fnError(d, 'custom', {}, `Invalid number at ${num2}`);

    try {
        data.result = m.pow(num1, num2)
    } catch (error) {
        return d.aoiError.fnError(d, 'custom', {}, `Invalid power at pow(${num1}, ${num2})`);
    }

    return {
        code: d.util.setCode(data)
    }
}