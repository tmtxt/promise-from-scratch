import MyPromise from './promise';

const resolvePromise = new MyPromise((resolve, reject) => {
  resolve('success');
});

const rejectPromise = new MyPromise((resolve, reject) => {
  reject('error');
});
