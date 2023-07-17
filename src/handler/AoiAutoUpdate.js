const {exec} = require("child_process");
const axios = require("axios").default;
const json = require("../../package.json");
module.exports = async () => {
    console.log(
        "oxi.js AutoUpdate: \u001b[33mExecuting a contact with API...\u001b[0m",
    );

    try {
        const res = await axios.get("https://registry.npmjs.com/oxi.js");
        if (json.version !== res.data["dist-tags"].latest) {
            console.log(
                "oxi.js AutoUpdate: \u001b[33mAvailable version v" +
                res.data.version +
                " ready to install.\u001b[0m",
            );

            // Install initiate
            console.log(
                "oxi.js AutoUpdate: \u001b[33m Installing version...\u001b[0m",
            );
            const Process = exec("npm i oxi.js@latest", (error) => {
                if (error)
                    return console.error(
                        "oxi.js AutoUpdate: \u001b[31mERR!\u001b[0m " +
                        error.message,
                    );

                console.log(
                    "oxi.js AutoUpdate: \u001b[32mSuccessfully Installed oxi.js v" +
                    res.data.version +
                    ".\u001b[0m",
                );
                console.log(
                    "oxi.js AutoUpdate: Commencing 'RESTART' in 3 Seconds...",
                );

                setTimeout(Reboot, 3000);
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
                "oxi.js AutoUpdate: \u001b[32mVersion is up-to-date.\u001b[0m",
            );
        }
    } catch (error) {
        console.warn(
            "oxi.js AutoUpdate: \u001b[31mUnexpected error when trying to reach API.\u001b[0m",
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
            `oxi.js AutoUpdate: \u001b[31mERR!\u001b[0m Failed to commence 'RESTART', ${e.message}`,
        );
    }
}
/*Copyright © 2021 @Akarui Development*/