//modified
module.exports = async d => {
    data = d.util.aoiFunc(d);
    const axios = require('axios');
    const [timestamp, format = "MM/DD/YY"] = data.inside.splits
    try {
    const response = await axios.get(`https://oxiapi.0xtag4.repl.co/json/formatdate?timestamp=${timestamp}&format=${encodeURIComponent(format)}`);

    data.result = response.data.result;
  } catch (error) {
    return d.aoiError.fnError(d, 'custom', {}, `Invalid timestamp at ${timestamp}`);
  }
    return {
      code: d.util.setCode(data)
    }
  }
