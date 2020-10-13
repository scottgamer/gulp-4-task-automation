const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");

gulp.task("hello", (done) => {
  console.log("hello gulp!");
  done();
});

gulp.task("task-1", (done) => {
  console.log("task 1 completed");
  done();
});

gulp.task("task-2", () => {
  return src("./digits.txt");
});

gulp.task("sass", () => {
  return gulp
    .src(["./src/sass/**/*.scss", "!./src/sass/widget.scss"])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/css"));
});
