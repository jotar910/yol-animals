import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { RequestStateUtil } from '@app/shared/utils/request-state.util';
import { AnimalsDataService } from '@app/animals/shared/services/animals-data.service';
import { IAnimalList } from '@app/animals/shared/models/animal-list.interface';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimalListComponent {

  animals$!: Observable<IAnimalList | null>;

  loading$!: Observable<boolean>;

  error$!: Observable<boolean>;

  private readonly fetch$ = new ReplaySubject<() => Observable<IAnimalList>>(1);

  constructor(private readonly animalsDataService: AnimalsDataService) {
    this.initSubscriptions();
    this.fetchAnimals();
  }

  fetchAnimals(): void {
    this.fetch$.next(() => this.animalsDataService.fetchList());
  }

  private initSubscriptions(): void {
    const requestState = new RequestStateUtil(this.fetch$);
    this.animals$ = requestState.data$;
    this.loading$ = requestState.loading$;
    this.error$ = requestState.error$;
  }

}
