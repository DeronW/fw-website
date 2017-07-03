let fs = require('fs')
const util = require('gulp-util');

// 需要传入一个参数是表示差量编译检测项目名称
// example : npm run pre-compile -- loan
const PROJ = process.argv[2];

const sourceF = `/tmp/website.${PROJ}.git.diff`
const targetF = `differential.compile.${PROJ}.sh`

if (!PROJ) throw new Error('缺少参数, 待编译项目名称');

fs.readFile(sourceF, (err, data) => {
    if (err) throw err;
    let lines = data.toString().split('\n');
    let r = {
        lib: false,
        npm: false,
        pages: {}
    }
    let reg_page = new RegExp(`apps/${PROJ}/([-\\w]+)/`)

    lines.forEach(line => {
        ['lib', 'public', 'tasks', 'scripts', `gulpfile.${PROJ}`].forEach(i => {
            if (line.trim().startsWith(i)) r.lib = true
        });
        let m = line.match(reg_page);
        if (m) {
            if (m[1] == 'lib') {
                r.lib = true
            } else {
                r.pages[m[1]] = true;
            }
        }

        if (line.match('package.json')) r.npm = true;
    })

    let sh_script = [];
    if (r.npm) sh_script.push('npm install')
    if (r.lib) {
        sh_script.push(`npm run build:${PROJ}`)
    } else {
        sh_script.push(`npm run gulp ${PROJ}:common_js`)
        for (let i in r.pages) {
            if (r.pages.hasOwnProperty(i))
                sh_script.push(`npm run gulp ${PROJ}:pack:${i}:revision`)
        }
        if (sh_script.length === 1) sh_script = [];
    }

    fs.writeFile(targetF, sh_script.join('\n'), (err) => {
        if (err) throw err;
        let t = r.lib || r.npm ?
            '需要完全编译' :
            sh_script.length ?
                '可以差量编译' :
                '无更新, 不需要编译';
        util.log(util.colors.yellow(`完成差量编译检测:${t}`));
        if (r.npm) {
            util.log(util.colors.yellow('package.json 包有更新, 需要执行 npm install'))
        } else {
            util.log(util.colors.yellow('package.json 没有变更, 不用更新 npm'))
        }

        fs.chmod(targetF, parseInt('755', 8));
    });
});
