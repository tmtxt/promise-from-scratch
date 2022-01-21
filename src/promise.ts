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
    // don't call these handleResolved and handleRejected function here
    // defer them until the promise is resolved or rejected
    this.handleResolved = handleResolved;
    this.handleRejected = handleRejected;
  }
}
