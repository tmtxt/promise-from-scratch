import MyPromise from './promise';

new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('success 1'), 300);
})
  .then((value) => {
    console.log(value);
    return 'sucesss 2';
  })
  .then((value) => {
    console.log(value);
    return 'success 3';
  })
  .then((value) => {
    console.log(value);
  });
