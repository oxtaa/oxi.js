module.exports = d => {
    const data = d.util.aoiFunc(d);

    data.result = d.client.user.username;

    return {
        code: d.util.setCode(data)
    };
}