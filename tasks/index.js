'use strict';

let gulp = require('gulp');

const html = require('./html.js');
const stylesheets = require('./stylesheets.js');
const less2css = require('./less.js');
const javascripts = require('./javascripts.js');
const react = require('./react.js');
const images = require('./images.js');
const copy = require('./copy.js');
const revision = require('./revision.js');

let COMMON_JAVASCRIPTS_TASK = {};

module.exports = function generate_task(site_name, page_name, configs) {

    let singlePageCfg = {};
    if (typeof (page_name) == 'object') {
        singlePageCfg = page_name;
        page_name = singlePageCfg.name
    }

    let app_path = `apps/${site_name}/${page_name}/`,
        build_path = `build/${site_name}/${page_name}/`,
        tmp_path = `build/${site_name}-tmp/`,
        lib_path = 'lib/',
        project_lib_path = `apps/${site_name}/lib`,
        cdn_path = `cdn/${site_name}/${page_name}/`,
        CONFIG = Object.assign({
            site_name: site_name,
            debug: false,
            // 新增编译环境, 有3种环境, development/testing/production
            environment: process.env.ENV || 'development',
            cmd_prefix: '', // 通用指令前缀，比如 pack:
            api_path: '',
            cdn_prefix: '',
            hbs_partials: [],
            project_components: [],
            project_javascripts: [],
            project_less: [],
            main_jsx: 'react/index.jsx',
            html_engine: 'hbs'
        }, configs, singlePageCfg);

    let task_name = site_name + ':' + (CONFIG.cmd_prefix ? CONFIG.cmd_prefix + ':' : '') + page_name;

    let less_files = [];
    less_files.push(...CONFIG.project_less.map(i => `${project_lib_path}/less/${i}`));
    less_files.push(`${app_path}less/index.less`);

    let jsx_files = []
    jsx_files.push(...CONFIG.project_components.map(
        i => `${project_lib_path}/components/${i}`))
    jsx_files.push(`${app_path}react/components/*.jsx`);
    jsx_files.push(`${app_path}${CONFIG.main_jsx}`);

    let common_javascript_files = [];

    let react_v = 'react-16.2.0'

    if (CONFIG.debug) {
        common_javascript_files.push(...[
            `${lib_path}${react_v}/react.development.js`,
            `${lib_path}${react_v}/react-dom.development.js`
        ])
    } else {
        common_javascript_files.push(...[
            `${lib_path}${react_v}/react.production.min.js`,
            `${lib_path}${react_v}/react-dom.production.min.js`
        ])
    }

    common_javascript_files = common_javascript_files.concat(
        CONFIG.project_javascripts.map(i => `${project_lib_path}/javascripts/${i}`));

    function compile_html() {
        let subfix = CONFIG.html_engine == 'hbs' ? 'hbs' : 'html';
        return html([`${app_path}index.${subfix}`], build_path, CONFIG, {
            API_PATH: CONFIG.api_path,
            DEBUG: CONFIG.debug,
            COMPILED_AT: (new Date()).toString()
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
        return copy([`${project_lib_path}/images/**`], `${build_path}images`)
    }

    function copy_audios() {
        return copy([`${app_path}audios/*`], `${build_path}audios`)
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
        gulp.watch(`${app_path}index.hbs`, gulp.parallel(compile_html));
        gulp.watch(`${app_path}images/**`, gulp.parallel(compile_images));
        gulp.watch(`${app_path}stylesheets/**`, gulp.parallel(compile_stylesheets));
        gulp.watch(`${app_path}less/**`, gulp.parallel(compile_less));
        gulp.watch(`${app_path}javascripts/**`, gulp.parallel(compile_javascripts));
        gulp.watch(`${app_path}react/**`, gulp.parallel(compile_react));
        gulp.watch(`${project_lib_path}/less/**`, gulp.parallel(compile_less));
        gulp.watch(`${project_lib_path}/javascripts/**`, gulp.parallel(compile_javascripts));
        gulp.watch(`${project_lib_path}/templates/**`, gulp.parallel(compile_html));
        gulp.watch(`${project_lib_path}/images/**`, gulp.parallel(compile_images));
        gulp.watch(`${project_lib_path}/components/**`, gulp.parallel(compile_react));

        gulp.watch(`lib/components/**`, gulp.parallel(compile_react));
        gulp.watch(`lib/less/**/*.less`, gulp.parallel(compile_less));
    }

    let common_javascripts = CONFIG.debug ? compile_common_javascripts : copy_common_javascripts;

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
            copy_audios
        ));

    CONFIG.debug ?
        gulp.task(`${task_name}:watch`, gulp.series(task_name, monitor)) :
        gulp.task(`${task_name}:revision`, gulp.series(task_name, copy2cdn, compile_revision));

    if (!CONFIG.debug && !COMMON_JAVASCRIPTS_TASK[site_name]) {
        gulp.task(`${site_name}:common_js`, gulp.series(
            () => javascripts(common_javascript_files, tmp_path, 'lib.js', true)));
        COMMON_JAVASCRIPTS_TASK[site_name] = true;
    }
};
