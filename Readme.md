# Gulp 4: Task Automation Complete Guide

Install Gulp globally
`npm i gulp-cli -g`

Install the gulp dependency
`npm install gulp --save-dev`

Check gulp version
`gulp -v`

All tasks in gulp are asynchronous
Every task must signal gulp when they are done

- using the `done()` callback
- using the `return` statement

File wildcards

- \*.scss - match all files at the end of the path
- \*_*/*_.scss - match all files at the end of the path plus all children files and folder
- !_.scss or !\*\*/_.scss - exclude matching expression

## Gulp APIs

- `gulp.task("task_name", function_or_api)` - Allows to set up a task with the name and the function/API that would return something

- `gulp.src("glob_pattern")` - Allows to set the path to the source files with the help of a glob pattern

- `gulp.pipe()` - Adds additional step to the task. Inside you can execute a plugin.

- `gulp.dest("glob_pattern")` - Allows to set the output path with the help of a glob pattern

- `gulp.watch(["glob_pattern"], tasks_to_be_executed)` - Watches for the globs changes and runs the tasks after a change has occurred

- `gulp.series(["name_of_the_task"])` - Allows to execute tasks in a sequential, strict order. Use it when the order is important
- `gulp.parallel(["name_of_the_task"])` - Allows to execute tasks simultaneously. Use it when the order is not important

## Gulp workflow

1. Find a plugin with the help of the browser: gulp feature_name

2. Install the plugin’s package: `npm install gulp-uglify --save-dev`

3. Import the plugin’s package to the gulpfile.js:

```js
const variable_name = require("gulp_plugin-name");
```

4. Create a basic task:

```js
gulp.task("task_name", function(callback) {
return(

)
callback();
})
```

5. Use the `gulp.src` method to specify a glob for the source files in the task:

```js
gulp.src("glob_pattern");
```

6. Add additional steps to the task with the `.pipe` method:

```js
.pipe()
```

7. Execute the plugin and provide additional options if they are required or needed:

```js
.pipe(rename("./styles.min.css"))
```

8. Use the `gulp.dest` method to specify the output directory for the files in the task:

```js
gulp.dest("/dist/");
```

9. Set the `gulp.watch` task in order to track the globes and execute tasks upon any changes

10. Use the `gulp.series` method when you want to execute tasks in the sequential, strict order:

```js
gulp.series(["sass", "js", "less"]);
```

11. Use the `gulp.parallel` method when you want to execute tasks simultaneously:

```js
gulp.parallel(["sass", "less", "imagemin", "html"]);
```
