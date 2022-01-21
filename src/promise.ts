type ResolveFn = (res: any) => void;
type RejectFn = (err: any) => void;
type PromiseExecuteFn = (resolve: ResolveFn, reject: RejectFn) => void;
type HandleResolvedFn = (res: any) => any;
type HandleRejectedFn = (err: any) => any;

export default class MyPromise {
  private status: 'init' | 'resolved' | 'rejected' = 'init';
  private handleResolved: HandleResolvedFn;
  private handleRejected: HandleRejectedFn;

  constructor(execute: PromiseExecuteFn) {
    const resolve: ResolveFn = (res) => {
      if (this.status !== 'init') return; // only resolve/reject once

      this.status = 'resolved';
      this.handleResolved && this.handleResolved(res);
    };
    const reject: RejectFn = (err) => {
      if (this.status !== 'init') return; // only resolve/reject once
      this.status = 'rejected';
      this.handleRejected && this.handleRejected(err);
    };

    try {
      execute(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(handleResolved: HandleResolvedFn, handleRejected?: HandleRejectedFn) {
    return new MyPromise((resolve, reject) => {
      // wrap the handleResolved function and resolve this one
      this.handleResolved = (outerRes) => {
        try {
          const innerRes = handleResolved(outerRes);
          if (innerRes instanceof MyPromise) {
            // Promise of Promise of Promise
            innerRes.then(resolve, reject);
          } else {
            resolve(innerRes);
          }
        } catch (e) {
          reject(e);
        }
      };
      // wrap the handleRejected function and reject this one
      this.handleRejected = (outerErr) => {
        try {
          // you need this if/else so in case the then doesn't provide the
          // handleRejected function, the error will be cascaded downstream
          if (handleRejected) {
            const innerErr = handleRejected(outerErr);
            if (innerErr instanceof MyPromise) {
              // Promise of Promise of Promise
              innerErr.then(resolve, reject);
            } else {
              reject(innerErr);
            }
          } else {
            reject(outerErr);
          }
        } catch (e) {
          reject(e);
        }
      };
    });
  }
}
