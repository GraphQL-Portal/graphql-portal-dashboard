import { Observable } from '@apollo/client';

export const promise2Observable = (promise: Promise<any>) => {
  return new Observable((observer) => {
    const subscriber = {
      complete: observer.complete.bind(observer),
      next: observer.next.bind(observer),
      error: observer.error.bind(observer),
    };
    promise.then(
      (observable) => observable?.subscribe(subscriber),
      (e) => subscriber.error(e)
    );
  });
};
