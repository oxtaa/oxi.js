const {default: axios} = require("axios");
const json = require("../../package.json");
module.exports = async () => {
    try {
        const res = await axios.get("https://oxiapi.0xtag4.repl.co/json/oxi.js")

        if (json.version !== res.data.version) {

            console.warn(
                "\x1b[31mWarning: \u001b[33mv" +
                res.data.version +
                " is available to install.\u001b[0m" + " (\x1b[31mnpm i oxi.js@" + res.data.version + "\x1b[0m)")
        }
    } catch {
    }
};
//modified