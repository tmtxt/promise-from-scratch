type ResolveFn = (res: any) => void;
type RejectFn = (err: any) => void;
type PromiseExecuteFn = (resolve: ResolveFn, reject: RejectFn) => void;
type HandleResolvedFn = (res: any) => any;
type HandleRejectedFn = (err: any) => any;

export default class MyPromise {
  private status: 'init' | 'resolved' | 'rejected' = 'init';
  private handleResolved: HandleResolvedFn;
  private handleRejected: HandleRejectedFn;
  private result: any;

  constructor(execute: PromiseExecuteFn) {
    const resolve: ResolveFn = (res) => {
      if (this.status !== 'init') return; // only resolve/reject once

      this.status = 'resolved';
      this.result = res;
      this.handleResolved && this.handleResolved(this.result);
    };
    const reject: RejectFn = (err) => {
      if (this.status !== 'init') return; // only resolve/reject once
      this.status = 'rejected';
      this.result = err;
      this.handleRejected && this.handleRejected(this.result);
    };

    try {
      execute(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(handleResolved: HandleResolvedFn, handleRejected?: HandleRejectedFn) {
    // don't call these handleResolved and handleRejected function here
    // defer them until the promise is resolved or rejected
    this.handleResolved = handleResolved;
    this.handleRejected = handleRejected;
  }
}
