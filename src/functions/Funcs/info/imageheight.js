//added
const axios = require('axios')
const sharp = require('sharp')
module.exports = async (d) => {
    data = d.util.aoiFunc(d);
    const [url] = data.inside.splits
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    if (!url) return d.aoiError.fnError(d, 'custom', {}, 'Not a valid image URL.');

    if (urlRegex.test(url) === false) { return d.aoiError.fnError(d, 'custom', {}, 'Not a valid image URL.'); } 
    const response = await axios.get(url, { responseType: 'arraybuffer' });

      if (response.headers['content-type'] !== 'image/jpeg' && response.headers['content-type'] !== 'image/png') {
        return d.aoiError.fnError(d, 'custom', {}, 'Not a valid image URL.');
      }

      const metadata = await sharp(response.data).metadata();

      data.result = metadata.height;
    return {
        code: d.util.setCode(data)
    }
}