const Benchmark = require("benchmark");

function buildForEachSuite(array) {
  return new Benchmark.Suite("forEach")
    .add("Array.forEach", function () {
      array.forEach((x) => {
        x.r = x.a + x.b;
      });
    })
    .add("for of", function () {
      for (const obj of array) {
        obj.r = obj.a + obj.b;
      }
    })
    .add("for <array.length, indexing", function () {
      for (let i = 0; i < array.length; ++i) {
        array[i].r = array[i].a + array[i].b;
      }
    })
    .add("for <len, indexing", function () {
      const len = array.length;
      for (let i = 0; i < len; ++i) {
        array[i].r = array[i].a + array[i].b;
      }
    })
    .add("for <array.length, tmp element", function () {
      for (let i = 0; i < array.length; ++i) {
        const x = array[i];
        x.r = x.a + x.b;
      }
    })
    .add("for <len, tmp element", function () {
      const len = array.length;
      for (let i = 0; i < len; ++i) {
        const x = array[i];
        x.r = x.a + x.b;
      }
    });
}

function buildMapSuite(array) {
  return new Benchmark.Suite("map")
    .add("Array.map", function () {
      return array.map((x) => x.a + x.b);
    })
    .add("Array.map, destructuring", function () {
      return array.map(({ a, b }) => a + b);
    })
    .add("for of", function () {
      try {
        const result = new Array(array.length)
        let i = 0
        for (const obj of array) {
          result[i] = obj.a + obj.b;
          i++
        }
        return result;
      } catch (err) {
        console.error(err)
      }
    })
    .add("for of, destructuring", function () {
      try {
        const result = new Array(array.length)
        let i = 0
        for (const { a, b } of array) {
          result[i] = a + b
          i++
        }
        return result;
      } catch (err) {
        console.error(err)
      }
    })
    .add("for, init array", function () {
      const result = new Array(array.length);
      for (let i = 0; i < array.length; ++i) {
        result[i] = array[i].a + array[i].b;
      }
      return result;
    });
}

function buildReduceSuite(array) {
  return new Benchmark.Suite("reduce")
    .add("Array.reduce", function () {
      return array.reduce((p, x) => p + x.a + x.b, 0);
    })
    .add("Array.reduce, destructuring", function () {
      return array.reduce((p, { a, b }) => p + a + b, 0);
    })
    .add("for of", function () {
      let result = 0;
      for (const { a, b } of array) {
        result += a + b;
      }
      return result;
    })
    .add("for", function () {
      let result = 0;
      for (let i = 0; i < array.length; ++i) {
        result += array[i].a + array[i].b;
      }
      return result;
    });
}

module.exports = {
  buildReduceSuite,
  buildForEachSuite,
  buildMapSuite,
};
