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
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const zip = require("gulp-zip");

const filesPath = {
  sass: "./src/sass/**/*.scss",
  js: "./src/js/**/*.js",
  images: "./src/img/**.+(png|jpg|gif|svg)",
  html: "./html/**/*.kit",
};

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

// Sass task
gulp.task("sass", () => {
  return gulp
    .src([filesPath.sass, "!./src/sass/widget.scss"])
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
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

// Javascript task
gulp.task("javascript", () => {
  return gulp
    .src([filesPath.js])
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
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
    .src([filesPath.images])
    .pipe(cache(imagemin()))
    .pipe(gulp.dest("./dist/img/"));
});

// Watch for changes
gulp.task("watch", () => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
    browser: ["chrome", "firefox"],
  });

  gulp
    .watch(
      [filesPath.sass, "**/*.html", filesPath.js, filesPath.images],
      gulp.parallel(["sass", "javascript", "imagemin"])
    )
    .on("change", browserSync.reload);
});

gulp.task("clear-cache", (done) => {
  return cache.clearAll(done);
});

// Serve
gulp.task("serve", gulp.parallel(["sass", "javascript", "imagemin"]));

// Gulp default command
gulp.task("default", gulp.series(["serve", "watch"]));

// Zip project
gulp.task("zip", () => {
  return gulp
    .src(["./**/*", "!./node_modules/**/*"])
    .pipe(zip("project.zip"))
    .pipe(gulp.dest("./"));
});
