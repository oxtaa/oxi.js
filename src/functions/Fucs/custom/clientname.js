//added by oxta.
module.exports = async (d) => {
    data = d.util.aoiFunc(d);

    data.result = d.client.user.username

    return {
        code: d.util.setCode(data)
    }
}