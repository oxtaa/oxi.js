module.exports = d => {
    const data = d.util.aoiFunc(d);

    if (d.client.user.discriminator === "0") {
        data.result = "@" + d.client.user.username;
    } else {
        data.result = d.client.user.tag;
    };

    return {
        code: d.util.setCode(data)
    };
}