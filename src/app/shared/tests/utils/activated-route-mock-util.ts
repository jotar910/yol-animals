import { ParamMap } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';

export class ActiveRouteSnapshotMock {
  get paramMap(): ParamMap {
    return {
      get: (name: string): string | null => {
        return this._paramMap.get(name) ?? null;
      },
      getAll: (name: string): string[] => {
        const value = this._paramMap.get(name);
        return value ? [value] : [];
      },
      has: (name: string): boolean => {
        return this._paramMap.has(name);
      },
      keys: Array.from(this._paramMap.keys())
    };
  }

  constructor(private readonly _paramMap = new Map<string, string>()) {
  }
}

export class ActivatedRouteMock {
  get snapshot(): ActiveRouteSnapshotMock {
    return this.route$.value;
  }

  get paramMap(): Observable<ParamMap> {
    return this.route$.pipe(map((route) => route.paramMap));
  }

  private readonly route$ = new BehaviorSubject(new ActiveRouteSnapshotMock());

  navigateByParamMap(params: Map<string, string>) {
    this.route$.next(new ActiveRouteSnapshotMock(params));
  }
}
