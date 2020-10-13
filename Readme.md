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
