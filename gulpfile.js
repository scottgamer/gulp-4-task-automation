const gulp = require("gulp");
const sass = require("gulp-sass");

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
    .src("./src/sass/main.scss")
    .pipe(sass())
    .pipe(gulp.dest("./dist/css"));
});
