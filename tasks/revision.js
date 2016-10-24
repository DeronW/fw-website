const gulp = require('gulp');
const RevAll = require('gulp-rev-all');

module.exports = revision = function (src_path, build_path, revAllOptions) {
    return gulp.src(src_path)
        .pipe(RevAll.revision(revAllOptions))
        .pipe(gulp.dest(build_path))
        .pipe(RevAll.manifestFile())
        .pipe(gulp.dest(build_path))
        .pipe(RevAll.versionFile())
        .pipe(gulp.dest(build_path));
};