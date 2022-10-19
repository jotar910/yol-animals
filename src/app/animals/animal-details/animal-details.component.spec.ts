import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AnimalDetailsComponent } from './animal-details.component';
import { AnimalsDataService } from '@app/animals/shared/services/animals-data.service';
import { animalListItemMock } from '@app/animals/shared/tests/mocks/animals.mock';
import { AnimalCardComponent } from '@app/animals/animal-card/animal-card.component';
import { AnimalCardPlaceholderComponent } from '@app/animals/animal-card-placeholder/animal-card-placeholder.component';
import { map, of, throwError, timer } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { parseParamRoute } from '@app/shared/utils/route.utils';
import { RouteEnums } from '@app/shared/enums/route.enums';
import { ActivatedRouteMock } from '@app/shared/tests/utils/activated-route-mock-util';

describe('AnimalDetailsComponent', () => {
  let component: AnimalDetailsComponent;
  let fixture: ComponentFixture<AnimalDetailsComponent>;
  let router: Router;
  let route: ActivatedRouteMock;
  let fetchSpy: jasmine.Spy;

  beforeEach(() => {
    route = new ActivatedRouteMock();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AnimalCardComponent,
        AnimalCardPlaceholderComponent,
        AnimalDetailsComponent
      ],
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: route
        },
        {
          provide: AnimalsDataService,
          useValue: {
            fetch: jasmine.createSpy('fetch').and.returnValue(of(animal().id))
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AnimalDetailsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fetchSpy = TestBed.inject(AnimalsDataService).fetch as jasmine.Spy;
  });

  function animal() {
    return animalListItemMock();
  }

  function initWithAnimal() {
    route.navigateByParamMap(new Map([[parseParamRoute(RouteEnums.ANIMALS_ID), animal().id]]));
  }

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should fetch animal list when component load', fakeAsync(async () => {
    initWithAnimal();
    fixture.detectChanges();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(animal().id);
  }));

  it('should redirect the user back when the id is not provided on route', () => {
    const navigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.reject('error'));
    fixture.detectChanges();
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['..'], { relativeTo: route as unknown as ActivatedRoute });
  });

  it('should display an animal card placeholder while waiting for the initial response to fetch', fakeAsync(() => {
    initWithAnimal();
    fetchSpy.and.callFake(() => timer(200).pipe(map(() => animal())));

    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-animal-card-placeholder')).toBeTruthy();

    tick(200);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-animal-card-placeholder')).toBeFalsy();
  }));

  it('should display the animal card', () => {
    initWithAnimal();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-animal-card')).toBeTruthy();
  });

  it('should display an error container when there is an error while fetching the animal', () => {
    fetchSpy.and.returnValue(throwError(() => 'error'));

    initWithAnimal();
    fixture.detectChanges();

    const messageEl: HTMLElement = fixture.nativeElement.querySelector('.message-box__title');
    expect(messageEl).toBeTruthy();
    expect(messageEl.textContent).toBe('Ops! Something went wrong');
  });

  it('should fetch the animal again when clicking on retry button on the error container', () => {
    fetchSpy.and.returnValue(throwError(() => 'error'));

    initWithAnimal();
    fixture.detectChanges();

    const buttonEl: HTMLButtonElement = fixture.nativeElement.querySelector('.animal-details__action.btn--primary');

    buttonEl.click();
    fixture.detectChanges();

    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(fetchSpy).toHaveBeenCalledWith(animal().id);
  });

  it('should redirect the user back when clicking on back button on the error container', () => {
    const navigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.reject('error'));
    fetchSpy.and.returnValue(throwError(() => 'error'));

    initWithAnimal();
    fixture.detectChanges();

    const buttonEl: HTMLButtonElement = fixture.nativeElement.querySelector('.animal-details__action.btn--outline-primary');

    buttonEl.click();
    fixture.detectChanges();

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith(['..'], { relativeTo: route as unknown as ActivatedRoute });
  });
});
