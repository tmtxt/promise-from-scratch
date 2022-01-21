import MyPromise from './promise';

new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('success 1'), 300);
})
  .then((value) => {
    console.log(`resolve ${value}`);
    return new MyPromise((resolve, reject) => {
      setTimeout(() => resolve('success 2'), 300);
    });
  })
  .then((value) => {
    console.log(`resolve ${value}`);
  });
