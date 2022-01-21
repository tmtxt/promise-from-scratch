import MyPromise from './promise';

new MyPromise((resolve, reject) => {
  setTimeout(() => reject('err 1'), 300);
})
  .then((value) => {
    console.log(`resolve ${value}`);
    return 'sucesss 2';
  })
  .then(
    (value) => {
      console.log(`resolve ${value}`);
      return 'sucesss 3';
    },
    (err) => {
      console.log(`reject ${err}`);
    }
  );
