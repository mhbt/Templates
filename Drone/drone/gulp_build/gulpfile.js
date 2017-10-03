var gulp = require('gulp'),
watch = require('gulp-watch'),
less = require('gulp-less'),
uglify = require('gulp-uglify'),
csso = require('gulp-csso'),
concat = require('gulp-concat'),
prefixer = require('gulp-autoprefixer'),
rename = require('gulp-rename');

var path = {
    build: {
        js: '../src/js/',
        css: '../src/css/'
    },
    src: {
        js: '../src/js/functions-no-compress.js',
        style: '../src/less/global.less'
    },
    watch: {
        js: '../src/js/functions-no-compress.js',
        style: '../src/less/*.less'
    }
};

gulp.task('jsminify', function(){
    return gulp.src(path.src.js)
        .pipe(rename({
            basename: "functions-compress",
            extname: ".js"
        }))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js));
});

gulp.task('cssminify', function(){
    return gulp.src(path.src.style)
        .pipe(less())
		.pipe(prefixer())
        .pipe(concat('global.css'))
        .pipe(csso())
        .pipe(gulp.dest(path.build.css));
});

gulp.task('watch', function(){
    watch([path.watch.js], function(event, cb) {
        gulp.start('jsminify');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('cssminify');
    });
});

gulp.task('default', ['watch']);