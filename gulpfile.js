const gulp = require("gulp");

const { dest, src, series, parallel, watch } = require("gulp");

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
const del = require("del");
const plumber = require("gulp-plumber");
// const notify = require("gulp-notify");

// notify.defaults({
//   messages: {
//     sass: "CSS was successfully compiled",
//     js: "Javascript is ready!",
//   },
//   prefix: "=====",
//   suffix: "=====",
//   exclusions: ".map",
// });

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
function sassTask() {
  return (
    src([filesPath.sass, "!./src/sass/widget.scss"])
      // .pipe(
      //   plumber({
      //     errorHandler: notify.error,
      //   })
      // )
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
      .pipe(dest("./dist/css"))
  );
  // .pipe(notify.success("sass"));
}

// Javascript task
function jsTask() {
  return (
    src([filesPath.js])
      // .pipe(
      //   plumber({
      //     errorHandler: notify.error,
      //   })
      // )
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
      .pipe(dest("./dist/js"))
  );
  // .pipe(notify.success("js"));
}

// Image Optimization
function imagesTask() {
  return (
    src([filesPath.images])
      // .pipe(
      //   plumber({
      //     errorHandler: notify.error,
      //   })
      // )
      .pipe(cache(imagemin()))
      .pipe(dest("./dist/img/"))
  );
}

// Watch for changes
function watchTask() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
    browser: ["chrome", "firefox"],
  });

  watch(
    [filesPath.sass, "**/*.html", filesPath.js, filesPath.images],
    parallel(sassTask, jsTask, imagesTask)
  ).on("change", browserSync.reload);
}

// Clear cache
function clearCache() {
  return cache.clearAll(done);
}

// Serve
// gulp.task("serve", gulp.parallel(["sass", "javascript", "imagemin"]));

// Gulp default command
// gulp.task("default", gulp.series(["serve", "watch"]));

// Zip project
function zipTask() {
  return src(["./**/*", "!./node_modules/**/*"])
    .pipe(zip("project.zip"))
    .pipe(dest("./"));
}

// Clean "dist" folder
function clean() {
  return del(["./dist/**/*"]);
}

// Gulp individual tasks
module.exports.sassTask = sassTask;
module.exports.jsTask = jsTask;
module.exports.imagesTask = imagesTask;
module.exports.watchTask = watchTask;
module.exports.clearCache = clearCache;
module.exports.zipTask = zipTask;
module.exports.clean = clean;

// Gulp Serve
module.exports.build = parallel(sassTask, jsTask, imagesTask);

// Gulp default
module.exports.default = series(exports.build, watchTask);
