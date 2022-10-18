import { catchError, filter, map, merge, Observable, of, shareReplay, switchMap } from 'rxjs';

interface IResponse<TValue> {
  data: TValue | null;
  error: Error | null;
}

export class RequestStateUtil<TValue> {

  readonly data$: Observable<TValue | null>;

  readonly loading$: Observable<boolean>;

  readonly error$: Observable<boolean>;

  constructor(private readonly trigger$: Observable<() => Observable<TValue>>) {
    const fetch$: Observable<IResponse<TValue>> = trigger$.pipe(
      switchMap((fetchCb) => fetchCb().pipe(
        map((data) => ({ data, error: null })),
        catchError((error) => of({ data: null, error }))
      )),
      shareReplay(1)
    );

    this.data$ = fetch$.pipe(map((response) => response?.data ?? null));

    this.loading$ = merge(
      trigger$.pipe(map(() => true)),
      fetch$.pipe(
        filter(Boolean),
        map(() => false)
      )
    );

    this.error$ = merge(
      trigger$.pipe(map(() => false)),
      fetch$.pipe(
        filter(Boolean),
        map((response) => !!response.error)
      )
    );
  }
}
