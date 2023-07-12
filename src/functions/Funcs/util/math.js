//modified
const m = require('mathjs')
module.exports = async (d) => {
    data = d.util.aoiFunc(d);
    const [expr] = data.inside.splits

    try {
        data.result = m.evaluate(expr)
    } catch (error) {
        return d.aoiError.fnError(d, 'custom', {}, `Invalid math expression at ${expr}`);
    }

    return {
        code: d.util.setCode(data)
    }
};
