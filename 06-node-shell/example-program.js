console.log("A (sync)");
// console.log("ID for process:", process.pid, "(sync)");

function doSomething(x) {
  return doSomethingElse(x);
}

function doSomethingElse(x) {
  return x + 1;
}

doSomething(44);

setTimeout(function () {
  console.log("B (Async)");
}, 2000);

console.log("C (sync)");

setTimeout(function () {
  console.log("D (Async)");
}, 1000);

console.log("E (sync)")

setTimeout(function () {
  console.log("F (async)");
}, 0);










