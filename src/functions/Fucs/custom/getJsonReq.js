module.exports = d => {
    const data = d.util.aoiFunc(d);
    const [varName, object = ''] = data.inside.splits;

    const varData = d.data.vars[varName?.addBrackets()];
    if (object && object.trim() !== '') {
      data.result = JSON.parse(varData)[object]
    } else {
      const json = JSON.stringify(JSON.parse(varData))
      if (json.length > 2000) {
        return d.aoiError.fnError(d, 'custom', {}, 'The number of characters in the JSON exceeds 2000, try selecting a specific property.');
      } else {
        data.result = json
      }
    }

    return {
        code: d.util.setCode(data)
    }
}