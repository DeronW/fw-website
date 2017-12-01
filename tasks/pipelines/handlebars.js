const through2 = require('through2');
const gutil = require('gulp-util');
const Handlebars = require('handlebars')
const fs = require('fs')

const PLUGIN_NAME = 'self-define-handlebars';

module.exports = function (opts) {
    'use strict';
    opts = opts || { partials: [] }

    // register partials
    opts.partials.forEach(i => {
        let content = fs.readFileSync(i.path).toString()
        Handlebars.registerPartial(i.name, content)
    })

    return through2.obj(function (file, enc, callback) {
        if (file.isNull()) {
            return callback(null, file);
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return callback();
        }

        var contents = file.contents.toString();
        var compiled = null;

        try {
            let template = Handlebars.compile(contents);
            compiled = template(opts.data);
        } catch (err) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, err, {
                fileName: file.path
            }));
            return callback();
        }

        file.contents = new Buffer(compiled);
        file.path = gutil.replaceExtension(file.path, '.html');

        callback(null, file);
    });
};
