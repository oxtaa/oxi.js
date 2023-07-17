//added by oxta.
module.exports = async (d) => {
    data = d.util.aoiFunc(d);
    const djs = require('discord.js');
    data.result = djs.version;

    return {
        code: d.util.setCode(data)
    }
}