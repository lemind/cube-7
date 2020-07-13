import { mergeMap, map, observeOn, subscribeOn } from 'rxjs/operators'
import { Subject, from, queueScheduler } from 'rxjs';

type Epic<T, O, S, D> = any

export default function createAPIPlugin<T, O, S, D>(rootEpic) {
  // TToDo
  return (store: any) => {
    // from redux-observable
    const QueueScheduler: any = queueScheduler.constructor;
    const uniqueQueueScheduler: typeof queueScheduler = new QueueScheduler(
      (queueScheduler as any).SchedulerAction
    );

    const epic$ = new Subject<Epic<T, O, S, D>>();

    const actionSubject$ = new Subject<T>();
    const action$ = actionSubject$
      .asObservable()
      .pipe(observeOn(uniqueQueueScheduler));

    const result$ = epic$.pipe(
      map(epic => {
        const output$ = epic(action$);

        if (!output$) {
          throw new TypeError(
            `Your root Epic "${epic.type ||
              '<anonymous>'}" does not return a stream. Double check you\'re not missing a return statement!`
          );
        }

        return output$;
      }),
      mergeMap(output$ =>
        from(output$).pipe(
          subscribeOn(uniqueQueueScheduler),
          observeOn(uniqueQueueScheduler)
        )
      )
    );

    result$.subscribe((res: any) => {
      store.commit(res.type, res.payload)
    });

    store.subscribe((mutation: any) => {
      actionSubject$.next(mutation);
    })

    epic$.next(rootEpic);
  }
}
