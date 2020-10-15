const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const cssNano = require("gulp-cssnano");
const uglify = require("gulp-uglify");

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
    .pipe(cssNano())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("javascript", () => {
  return gulp
    .src(["./src/js/**/*.js"])
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js"));
});

gulp.task("watch", () => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
    browser: ["chrome", "firefox"],
  });

  gulp
    .watch(
      ["./src/sass/**/*.scss", "**/*.html", "./src/js/**/*.js"],
      gulp.series(["sass", "javascript"])
    )
    .on("change", browserSync.reload);
});
