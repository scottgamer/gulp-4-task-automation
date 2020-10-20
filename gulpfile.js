const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const cssNano = require("gulp-cssnano");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");

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
    .pipe(
      rename((path) => {
        if (!path.extname.endsWith(".map")) {
          path.basename += ".min";
        }
      })
    )
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("javascript", () => {
  return gulp
    .src(["./src/js/**/*.js"])
    .pipe(concat("project.js"))
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest("./dist/js"));
});

// Image Optimization
gulp.task("imagemin", () => {
  return gulp
    .src(["./src/img/**/*.+(png|jpg|gif|svg)"])
    .pipe(cache(imagemin()))
    .pipe(gulp.dest("./dist/img/"));
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
      [
        "./src/sass/**/*.scss",
        "**/*.html",
        "./src/js/**/*.js",
        "./src/img/**/*.+(png|jpg|gif|svg)",
      ],
      gulp.series(["sass", "javascript", "imagemin"])
    )
    .on("change", browserSync.reload);
});

gulp.task("clear-cache", (done) => {
  return cache.clearAll(done);
});
