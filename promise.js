"use strict";

class MyPromise {
  constructor(executor) {
    const resolve = (res) => {
      console.log(`resolved: ${res}`);
    };
    const reject = (err) => {
      console.log(`reject: ${err}`);
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
}

const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 300);
});
