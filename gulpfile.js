var gulp = require("gulp");
var sass = require("gulp-sass");
// var browserSync = require("browser-sync").create();

gulp.task("sass", function() {
    return gulp.src("./views/sass/*.scss")
        .pipe(sass())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest("./views/public"))
    //     .pipe(browserSync.reload({
    //         stream: true
    //     })
    // );
});

// gulp.task("browserSync", function() {
//     browserSync.init({
//         server: {
//             baseDir: "./"
//         }
//     })
// });

gulp.task("watch", ["sass"], function() {
    // gulp.watch("views/public/*.html",browserSync.reload);
    // gulp.watch("views/public/*.js", browserSync.reload);
    gulp.watch("./views/sass/*.scss", ["sass"]);
});
