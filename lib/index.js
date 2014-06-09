/**
 * @fileOverview beez optim
 * @name index.js<beez-optim>
 * @author fkei <kei.topaz@gmail.com>
 * @license MIT
 */


var fs = require('fs');

var colors = require('colors');
var _ = require('underscore');

var beezlib = require('beezlib');


var BeezOptim = function () {
    this.logger = beezlib.logger;
    this.VERSION = '0.2.1';
};

BeezOptim.DEFAULT_OPTIONS = {
    optipng: {
        use: true,
        level: 2
    },
    jpegoptim: {
        use: true,
        options: '--strip-all'
    },
    pngquant: {
        use: false,
        options: "--ext .png -f -v"
    }
};


/**
 * build
 */
BeezOptim.prototype.commander = function (callback) {
    var commander = require('commander');

    commander
        .option('-p --limit <limit>', 'process limit default=10', parseInt)
        .option('-s --srcdir <srcdir>', 'Source directory root path.')
        .option('-c --config <config>', 'configuration file.\n' +
                "example config data:\n" +
                "\t{\n" +
                "\t  optipng: {\n" +
                "\t    use: true,\n" +
                "\t    level: 2\n" +
                "\t  },\n" +
                "\t  jpegoptim: {\n" +
                "\t    use: true,\n" +
                "\t    options: '--strip-all'\n" +
                "\t  },\n" +
                "\t  pngquant: {\n" +
                "\t    use: false,\n" +
                "\t    options: \"--ext .png -f -v\"\n" +
                "\t  }\n" +
                "\t}\n"
               )
        .option('-l --loglevel <loglevel>', 'Log level. default) INFO\n\tDEBUG: 1\n\tINFO:  2\n\tWARN:  3\n\tERROR: 4\n\tFATAL: 5', parseInt)

        .parse(process.argv)
    ;


    // check src
    var limit = commander.limit || 10;

    if (!commander.srcdir) {
        beezlib.logger.error('-s --srcdir not found.', commander.srcdir);
        callback && callback(2);
        return;
    }

    if (!beezlib.fsys.isDirectorySync(commander.srcdir)) {
        beezlib.logger.error('-s --srcdir not found is directory. srcdir:', commander.srcdir);
        callback && callback(2);
        return;
    }

    var options = this.DEFAULT_OPTIONS;

    if (commander.config) {
        try {
            options = beezlib.fsys.readFileMultiConfigureSync(commander.config, 'utf-8');
        } catch (e) {
            beezlib.logger.error(e.message, "path:", commander.config);
            beezlib.logger.debug(e.stack);
            callback && callback(2);
        }

    }

    var loglevel = commander.loglevel || beezlib.logger.LEVELS.INFO;

    this.build(commander.srcdir, options, loglevel, limit, function (err, ress) {
        if (err) {
            console.err(err);
            callback && callback(1, err);
            return;
        }
        callback && callback(null, ress);
    });

};

/**
 * build
 */
BeezOptim.prototype.build = function (srcdir, options, loglevel, limit, callback) {

    if (typeof loglevel === 'function') {
        callback = loglevel;
        loglevel = beezlib.logger.LEVELS.INFO;
    }


    this.logger.level = loglevel;

    beezlib.logger.debug('srcdir:', srcdir);
    beezlib.logger.debug('limit:', limit);
    beezlib.logger.debug('options:', JSON.stringify(options, null, '    '));

    colors.setTheme(beezlib.constant.LOGGER_COLOR_THEME);
    this.logger.colors = true;
    options.limit = limit

    beezlib.image.optimdir(srcdir, options, callback);

};

module.exports = new BeezOptim();
