const del = require('del');
var colors = require('colors');

del(['build', 'dest', 'dist', 'cdn']).then(paths => {
    console.log(colors.red('删除文件及目录:'));
    paths.forEach(i => console.log(colors.gray(i)));
    if (!paths.length) console.log(colors.yellow('没有需要删除的目录'));
});