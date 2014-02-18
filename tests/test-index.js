/**
 * @fileOverview Test case: lib/index.js
 * @name test-index.js<tests>
 * @author fkei <kei.topaz@gmail.com>
 * @license MIT
 */

var beezoptim = require('../lib');

var chai = require('chai');
var expect = chai.expect;
var beezlib = require('beezlib');

beezoptim.logger.level = beezoptim.logger.LEVELS.DEBUG;

var srcdir = 'tests/image';

describe('index.js', function () {
    it('VERSION', function () {
        expect(beezoptim.VERSION).be.ok;
    });

    it('build', function (done) {
        var options = {
            optipng: {
                use: true,
                level: 3
            },
            jpegoptim: {
                use: true,
                options: '--strip-all'
            },
            pngquant: {
                use: true,
                options: "--ext .png -f -v"
            }
        };

        beezoptim.build(srcdir, options, beezoptim.logger.LEVELS.DEBUG, function (err, ress) {
            expect(!err).be.ok
            done();
        });

    });
});
