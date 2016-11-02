'use strict';

var gulp = require('gulp');

const html = require('./html.js');
const stylesheets = require('./stylesheets.js');
const less2css = require('./less.js');
const javascripts = require('./javascripts.js');
const react = require('./react.js');
const images = require('./images.js');
const copy = require('./copy.js');
const revision = require('./revision.js');

let COMMON_JAVASCRIPTS_TASK = {};

// project_name 每次使用新项目时, 只需要更换项目名称
module.exports = function generate_task(site_name, project_name, configs) {

    var app_path = `apps/${site_name}/${project_name}/`,
        build_path = `build/${site_name}/${project_name}/`,
        public_path = 'public/',
        tmp_path = `build/${site_name}-tmp/`,
        lib_path = 'lib/',
        cdn_path = `cdn/${site_name}/${project_name}/`,
        CONFIG = Object.assign({
            debug: false,
            cmd_prefix: '', // 通用指令前缀，比如 pack:
            api_path: '',
            cdn_prefix: '',
            include_components: [],
            include_common_js: [],
            main_jsx: 'react/index.jsx',
            html_engine: 'swig'
        }, configs);

    let task_name = site_name + ':' + (CONFIG.cmd_prefix ? CONFIG.cmd_prefix + ':' : '') + project_name;

    var less_files = [
        `${lib_path}less/common.less`,
        `${lib_path}less/grid.less`,
        `${lib_path}less/header-status-bar.less`,
        `${lib_path}less/header-nav-bar.less`,
        `${lib_path}less/footer.less`,
        `${lib_path}less/sidebar-fn.less`,
        `${lib_path}less/not-support-ie6-ie7.less`,
        `${app_path}less/index.less`
    ];

    var jsx_files = CONFIG.include_components.map((i)=> `${lib_path}components/${i}`);
    jsx_files.push(`${app_path}react/components/*.jsx`);
    jsx_files.push(`${app_path}${CONFIG.main_jsx}`);

    var common_javascript_files = [
        `${lib_path}jquery-1.12.4.min.js`,
        `${lib_path}javascripts/eten/common-functions.js`,
        `${lib_path}javascripts/eten/interest-calculator.js`
    ];
    if (CONFIG.debug) {
        common_javascript_files.push(`${lib_path}react-0.14.8/react.js`);
        common_javascript_files.push(`${lib_path}react-0.14.8/react-dom.js`);
    } else {
        common_javascript_files.push(`${lib_path}react-0.14.8/react.min.js`);
        common_javascript_files.push(`${lib_path}react-0.14.8/react-dom.min.js`);
    }

    common_javascript_files = common_javascript_files.concat(
        CONFIG.include_common_js.map(file => `${lib_path}${file}`));

    function compile_html() {
        return html([`${app_path}index.html`], build_path, CONFIG.html_engine, {
            API_PATH: CONFIG.api_path,
            DEBUG: CONFIG.debug
        })
    }

    function compile_stylesheets() {
        return stylesheets([`${app_path}stylesheets/*.css`], `${build_path}stylesheets`)
    }

    function compile_less() {
        return less2css(less_files, `${build_path}stylesheets`, 'all.less.css', CONFIG.debug)
    }

    function compile_react() {
        return react(jsx_files, `${build_path}javascripts`, 'bundle.js', CONFIG.debug)
    }

    function compile_javascripts() {
        return javascripts([`${app_path}javascripts/*.js`], `${build_path}javascripts`, null, CONFIG.debug)
    }

    function compile_common_javascripts() {
        return javascripts(common_javascript_files, `${build_path}javascripts`, 'lib.js', CONFIG.debug)
    }

    function copy_common_javascripts() {
        return copy([`${tmp_path}lib.js`], `${build_path}javascripts`)
    }

    function compile_images() {
        return images([`${app_path}images/**/*.+(jpg|png|gif)`], `${build_path}images`)
    }

    function compile_public_images() {
        return copy([`${public_path}images/*`], `${build_path}images`)
    }

    function copy_audios() {
        return copy([`${app_path}audios/*`], `${build_path}audios`)
    }

    function compile_public_javascripts() {
        return copy([`${public_path}javascripts/*`], `${build_path}javascripts`)
    }

    function copy2cdn() {
        return copy([`${build_path}/**`], cdn_path)
    }

    function compile_revision() {
        return revision([`${build_path}/**`], cdn_path, {
            dontRenameFile: [/^\/favicon.ico$/g, 'index.html'],
            transformPath: function (rev, source, path) {
                // 在css中, 采用的是相对的图片路径, 但是在加入版本和前缀域名后不能再使用相对路径
                if (rev.startsWith('../')) rev = rev.substr(3);
                return CONFIG.cdn_prefix + rev
            }
        })
    }

    function monitor() {
        gulp.watch(`${app_path}index.html`, gulp.parallel(compile_html));
        gulp.watch(`${app_path}images/**`, gulp.parallel(compile_images));
        gulp.watch(`${app_path}stylesheets/**`, gulp.parallel(compile_stylesheets));
        gulp.watch(`${app_path}less/**`, gulp.parallel(compile_less));
        gulp.watch(`${app_path}javascripts/**`, gulp.parallel(compile_javascripts));
        gulp.watch(`${app_path}react/**`, gulp.parallel(compile_react));

        gulp.watch(`${public_path}common/images/**`, gulp.parallel(compile_images));
        gulp.watch(`lib/components/**`, gulp.parallel(compile_react));
        gulp.watch(`lib/templates/**/*.html`, gulp.parallel(compile_html));
        gulp.watch(`lib/less/**/*.less`, gulp.parallel(compile_less));
    }

    var common_javascripts = CONFIG.debug ? compile_common_javascripts : copy_common_javascripts;

    gulp.task(task_name,
        gulp.series(
            compile_html,
            compile_stylesheets,
            compile_less,
            compile_javascripts,
            compile_react,
            common_javascripts,
            compile_images,
            compile_public_images,
            copy_audios,
            compile_public_javascripts
        ));

    CONFIG.debug ?
        gulp.task(`${task_name}:watch`, gulp.series(task_name, monitor)) :
        gulp.task(`${task_name}:revision`, gulp.series(task_name, copy2cdn, compile_revision));

    if (!CONFIG.debug && !COMMON_JAVASCRIPTS_TASK[site_name]) {
        gulp.task(`${site_name}:common_js`, gulp.series(
            () => javascripts(common_javascript_files, tmp_path, 'lib.js')));
        COMMON_JAVASCRIPTS_TASK[site_name] = true;
    }
};