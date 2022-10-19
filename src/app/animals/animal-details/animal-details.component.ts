import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { IAnimal } from '@app/animals/shared/models/animal.interface';
import { AnimalsDataService } from '@app/animals/shared/services/animals-data.service';
import { RequestStateUtil } from '@app/shared/utils/request-state.util';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RouteEnums } from '@app/shared/enums/route.enums';
import { parseParamRoute } from '@app/animals/shared/utils/route.utils';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimalDetailsComponent implements OnInit, OnDestroy {

  animal$!: Observable<IAnimal | null>;

  loading$!: Observable<boolean>;

  error$!: Observable<boolean>;

  private readonly fetch$ = new ReplaySubject<() => Observable<IAnimal>>(1);

  private readonly subscriptions: Subscription[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly animalsDataService: AnimalsDataService
  ) {
  }

  ngOnInit(): void {
    this.initSubscriptions();
    this.fetchAnimal();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
  }

  fetchAnimal(): void {
    this.fetchAnimalByParamMap(this.route.snapshot.paramMap);
  }

  goBack(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
      .catch((e) => console.error('Error navigating back', e));
  }

  private fetchAnimalByParamMap(paramMap: ParamMap): void {
    const paramId = paramMap.get(parseParamRoute(RouteEnums.ANIMALS_ID));

    if (paramId) {
      this.fetch$.next(() => this.animalsDataService.fetch(paramId));
      return;
    }

    this.goBack();
  }

  private initSubscriptions(): void {
    const requestState = new RequestStateUtil(this.fetch$);
    this.animal$ = requestState.data$;
    this.loading$ = requestState.loading$;
    this.error$ = requestState.error$;

    this.subscriptions.push(
      this.route.paramMap.subscribe(this.fetchAnimalByParamMap.bind(this))
    );
  }

}
