const { task, src } = require("gulp");

task("hello", (done) => {
  console.log("hello gulp!");
  done();
});

task("task-1", (done) => {
  console.log("task 1 completed");
  done();
});

task("task-2", () => {
  return src("./digits.txt");
});
