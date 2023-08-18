const {default: axios} = require("axios");
const json = require("../../package.json");
module.exports = async () => {
    try {
        const res = await axios.get("https://registry.npmjs.com/oxi.js")

        if (json.version !== res.data['dist-tags'].latest) {

            console.warn(
                "\x1b[31mNotice: \u001b[33mVersion " +
                res.data['dist-tags'].latest +
                " is available to install.\u001b[0m" + " (\x1b[31mnpm i oxi.js@latest\x1b[0m)")
        }
    } catch {
    }
};
//modified