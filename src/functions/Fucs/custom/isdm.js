module.exports = async (d) => {
    const data = d.util.aoiFunc(d);

    data.result = d.message.channel.type === "DM";

    return {
        code: d.util.setCode(data),
    };
};