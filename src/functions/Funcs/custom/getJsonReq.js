module.exports = d => {
    const data = d.util.aoiFunc(d);
    const [varName, object = ''] = data.inside.splits;

    const varData = d.data.vars[varName?.addBrackets()];
    if (object && object.trim() !== '') {
      const properties = object.split('.');
      let value = JSON.parse(varData);

      for (const prop of properties) {
        if(value[prop] !== undefined) {
          value = value[prop];
        } else {
          value = null;
          break;
        }
      };

      data.result = value;
    } else {
      const json = JSON.stringify(JSON.parse(varData));
      if (json.length > 2000) {
        return d.aoiError.fnError(d, 'custom', {}, 'The number of characters in the JSON exceeds 2000, try selecting a specific property.');
      } else {
        data.result = json;
      };
    };

    return {
        code: d.util.setCode(data)
    };
}