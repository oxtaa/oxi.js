module.exports = async d => {
    const data = d.util.aoiFunc(d);
    if (data.err) return d.error(data.err);

    let [ value, Id = d.guild?.id || "dm" ] = data.inside.splits;

    value = value.addBrackets();

    if (!d.client.variableManager.has("prefix".addBrackets(), d.client.db.tables[0]))
        return d.aoiError.fnError(
            d,
            "custom",
            {},
            `Variable "prefix" hasn't been added.`,
        );

    const variable = d.client.variableManager.get("prefix", d.client.db.tables[0]);


    value = d.client.variableManager.parseData(value, variable.type);

    try {
        await d.client.db.set(d.client.db.tables[0], "prefix".addBrackets(), Id, value);
    } catch (e) {
        d.aoiError.fnError(
            d,
            "custom",
            {},
            `Variable "prefix" hasn't been added.`,
        );
    };

    return {
        code: d.util.setCode(data),
    };
};