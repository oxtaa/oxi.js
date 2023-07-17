//added
module.exports = async d => {
    const data = d.util.aoiFunc(d);

    let [guildID = d.guild?.id] = data.inside.splits;
    varname = "prefix".addBrackets();

    if (!d.client.variableManager.has("prefix", d.client.db.tables[0])) return d.aoiError.fnError(d, 'custom', {}, `Variable "prefix" hasn't been added.`);

    data.result =
        (await d.client.db.get(d.client.db.tables[0], "prefix", guildID))?.value ||
        d.client.variableManager.get("prefix", d.client.db.tables[0])?.default;

    data.result = typeof data.result === 'object' ? JSON.stringify(data.result) : data.result;

    return {
        code: d.util.setCode(data)
    }
}