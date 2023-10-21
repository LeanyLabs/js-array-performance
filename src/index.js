const {
  buildForEachSuite,
  buildMapSuite,
  buildReduceSuite,
} = require("./benchmarks");

function runSuite(suite) {
  console.log(`\nBenchmarking ${suite.name}:`);

  suite
    .on("cycle", function (event) {
      console.log(String(event.target));
    })
    .on("complete", function () {
      console.log(this.filter("fastest").map("name") + " is faster");
    })
    .run();
}

function generateTestArray() {
  const result = [];
  for (let i = 0; i < 1000000; ++i) {
    result.push({
      a: i,
      b: i / 2,
      r: 0,
    });
  }
  return result;
}

const testArray = generateTestArray();

//runSuite(buildForEachSuite(testArray));
runSuite(buildMapSuite(testArray));
//runSuite(buildReduceSuite(testArray));
