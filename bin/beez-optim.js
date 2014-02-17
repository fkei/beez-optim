#!/usr/bin/env node

var optim = require('../lib');

optim.commander(function (err, ress) {
    if (err) {
        process.exit(err);
        return;
    }
    console.log("");
    optim.logger.debug(JSON.stringify(ress, null, '    '));
    console.log("");
    optim.logger.info("Success!!!");
    console.log("");
    process.exit(0);
});
