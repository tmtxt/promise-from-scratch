'use strict';

class MyPromise {
  status = 'init'; // init|resolved|rejected
  res = null;

  resolveFn = null;
  rejectFn = null;

  constructor(executor) {
    const resolve = (res) => {
      if (this.status === 'init') {
        this.status = 'resolved';
        this.res = res;

        this.resolveFn && this.resolveFn(this.res);
      }
    };

    const reject = (err) => {
      if (this.status === 'init') {
        this.status = 'rejected';
        this.res = err;

        this.rejectFn && this.rejectFn(this.res);
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(handleResolved, handleRejected) {
    // this.resolveFn = handleResolved;
    // this.rejectFn = handleRejected;
    if (this.status === 'init') {
      return new MyPromise((resolve, reject) => {
        this.resolveFn = () => {
          const res = handleResolved(this.res);
          resolve(res);
        };
        this.rejectFn = () => {
          const res = handleRejected(this.res);
          reject(err);
        };
      });
    }

    // return new MyPromise((resolve, reject) => {
    //   if (this.status === 'init') {
    //     this.resolveFn = () => {
    //       try {
    //         const res = handleResolved(this.res);
    //         resolve(res);
    //       } catch (e) {
    //         reject(e);
    //       }
    //     };
    //     this.rejectFn = () => {};
    //   }

    //   if (this.status === 'resolved') {
    //   }
    // });
  }
}

// const myPromise = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('foo');
//   }, 500);
// });

// myPromise
//   .then((value) => {
//     console.log(value);
//     return 'bar';
//   })
//   .then((value) => {
//     console.log(value);
//   });
