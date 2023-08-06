module.exports = d => {
    const data = d.util.aoiFunc(d);
    const [note = "none"] = data.inside.splits;

    data.result = '';

    return {
        code: d.util.setCode(data)
    }
}