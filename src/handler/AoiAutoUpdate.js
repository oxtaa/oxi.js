const {exec} = require("child_process");
const axios = require("axios").default;
const json = require("../../package.json");
module.exports = async () => {
    console.log(
        "oxi.js: \u001b[33mTrying to fetch latest version...\u001b[0m",
    );

    try {
        const res = await axios.get("https://registry.npmjs.com/oxi.js");
        if (json.version !== res.data['dist-tags'].latest) {
            console.log(
                "oxi.js: \u001b[33mAvailable version v" +
                res.data['dist-tags'].latest +
                " ready to install.\u001b[0m",
            );

            // Install initiate
            console.log(
                "oxi.js: \u001b[33m Installing version" + data['dist-tags'].latest + "\u001b[0m",
            );
            const Process = exec("npm i oxi.js@latest", (error) => {
                if (error)
                    return console.error(
                        "oxi.js: \u001b[31mERR!\u001b[0m " +
                        error.message,
                    );

                console.log(
                    "oxi.js: \u001b[32mSuccessfully Installed oxi.js v" +
                    res.data['dist-tags'].latest +
                    ".\u001b[0m",
                );
                console.log(
                    "oxi.js: Restarting...",
                );

                setTimeout(Reboot, 1000);
            });
            Process.stdout.setEncoding("utf8");
            Process.stdout.on("data", (chunk) => {
                console.log(chunk.toString());
            });

            Process.stderr.setEncoding("utf8");
            Process.stderr.on("data", (chunk) => {
                console.log(chunk.toString());
            });
        } else {
            console.log(
                "oxi.js: \u001b[32mVersion is up-to-date.\u001b[0m",
            );
        }
    } catch (error) {
        console.warn(
            "oxi.js: \u001b[31mUnexpected error when trying to fetch latest version.\u001b[0m",
        );
    }
};

function Reboot() {
    try {
        process.on("exit", () => {
            require("child_process").spawn(process.argv.shift(), process.argv, {
                cwd: process.cwd(),
                detached: true,
                stdio: "inherit",
            });
        });
        process.exit();
    } catch (e) {
        console.error(
            `oxi.js: \u001b[31mERR!\u001b[0m Restart failed, ${e.message}`,
        );
    }
}
/*
Copyright © 2021 @Akarui Development
Edited by oxta.
*/