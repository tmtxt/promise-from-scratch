import MyPromise from './promise';

const resolvePromise = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('success'), 300);
}).then((value) => console.log(value));

const rejectPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => reject('error'), 300);
}).then(
  (value) => {},
  (err) => console.log(err)
);
