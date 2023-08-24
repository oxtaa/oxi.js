const djs = require('discord.js');
module.exports = d => {
    const data = d.util.aoiFunc(d);

    data.result = djs.version;

    return {
        code: d.util.setCode(data)
    };
}