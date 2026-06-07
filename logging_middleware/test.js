const Log = require("./logger");

async function test() {
    const result = await Log(
        "backend",
        "info",
        "service",
        "Backend logging middleware test"
    );

    console.log(result);
}

test();