# Performance benchmarks for different array iteration methods.

The goal is to show that imperative programming using `for` and `for...of` is 3+ times faster than declarative alternatives.

In most cases, when dealing with small arrays, this doesn't matter and won't affect the whole application's performance in any way. However, when processing large amounts of data in some kind of business intelligence app, video processing, scientific calculations, or game engine, this will have a massive effect on the overall performance.

Running the tests locally:

```bash
npm i
npm start
```

## Results on i7-13700H running Ubuntu 22.04 LTS with Node v22.3.0

![forEach vs for vs for..of](results/forEach.svg)
![map vs for vs for..of](results/map.svg)
![reduce vs for vs for..of](results/reduce.svg)

```
Benchmarking forEach:
Array.forEach x 221 ops/sec ±5.37% (85 runs sampled)
for of x 205 ops/sec ±6.49% (84 runs sampled)
for <array.length, indexing x 278 ops/sec ±1.76% (80 runs sampled)
for <len, indexing x 266 ops/sec ±1.22% (78 runs sampled)
for <array.length, tmp element x 268 ops/sec ±1.23% (82 runs sampled)
for <len, tmp element x 253 ops/sec ±1.90% (78 runs sampled)
for <array.length, indexing is faster

Benchmarking map:
Array.map x 44.74 ops/sec ±8.81% (61 runs sampled)
Array.map, destructuring x 46.95 ops/sec ±7.73% (63 runs sampled)
for of x 63.31 ops/sec ±7.96% (58 runs sampled)
for of, destructuring x 64.06 ops/sec ±6.16% (57 runs sampled)
for, init array x 150 ops/sec ±1.78% (79 runs sampled)
for, init array is faster

Benchmarking reduce:
Array.reduce x 151 ops/sec ±2.16% (72 runs sampled)
Array.reduce, destructuring x 149 ops/sec ±2.45% (77 runs sampled)
for of x 184 ops/sec ±7.82% (71 runs sampled)
for x 305 ops/sec ±2.28% (75 runs sampled)
for is faster
```

## Conculsions

- `.forEach`, `.reduce`, `.map` are much slower than their direct imperative implementations. Callback function costs matter here.
- `for` and `for..of` have roughly the same performance for arrays
- There's no point in trying to micro-optimize the for loop for arrays. V8 already does a great job.
- Destructuring doesn't affect the performance.
- It's faster to pre-allocate the array with a known length than to rely on push automatic growth.

---

Read more on [our blog](https://leanylabs.com/blog/js-forEach-map-reduce-vs-for-for_of/).
