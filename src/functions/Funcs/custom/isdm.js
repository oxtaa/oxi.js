module.exports = async (d) => {
    const data = d.util.aoiFunc(d);

    try {
        data.result = d.message.channel.type === "DM";
    } catch (e) {
        return d.aoiError.fnError(d, 'custom', {}, 'Unexpected error when trying to fetch channel type.');
    }

    return {
        code: d.util.setCode(data),
    };
};