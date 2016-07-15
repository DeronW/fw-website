const gulp = require('gulp');
const rev_all = require('gulp-rev-all');


module.exports = revision = function (src_path, build_path, revAllOptions) {

    var RevAll = new rev_all(revAllOptions);

    return gulp.src(src_path)
        .pipe(RevAll.revision())
        .pipe(gulp.dest(build_path))
        .pipe(RevAll.manifestFile())
        .pipe(gulp.dest(build_path))
        .pipe(RevAll.versionFile())
        .pipe(gulp.dest(build_path));
};