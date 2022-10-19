import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AnimalListComponent } from './animal-list.component';
import { AnimalsDataService } from '@app/animals/shared/services/animals-data.service';
import { map, of, throwError, timer } from 'rxjs';
import { animalListItemsMock, animalListMock } from '@app/animals/shared/tests/mocks/animals.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@app/shared/shared.module';
import { AnimalCardComponent } from '@app/animals/animal-card/animal-card.component';
import { AnimalCardPlaceholderComponent } from '@app/animals/animal-card-placeholder/animal-card-placeholder.component';

describe('AnimalListComponent', () => {
  let component: AnimalListComponent;
  let fixture: ComponentFixture<AnimalListComponent>;
  let fetchListSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AnimalCardComponent,
        AnimalListComponent,
        AnimalCardPlaceholderComponent
      ],
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        {
          provide: AnimalsDataService,
          useValue: {
            fetchList: jasmine.createSpy('fetchList').and.returnValue(of(animalListMock()))
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AnimalListComponent);
    component = fixture.componentInstance;

    fetchListSpy = TestBed.inject(AnimalsDataService).fetchList as jasmine.Spy;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should fetch animal list when component load', () => {
    fixture.detectChanges();
    expect(fetchListSpy).toHaveBeenCalledTimes(1);
  });

  it('should display 5 animal item placeholders while waiting for the initial response to fetch the list', fakeAsync(() => {
    fetchListSpy.and.callFake(() => timer(200).pipe(map(() => animalListMock())));

    fixture.detectChanges();
    const tableEl: HTMLElement = fixture.nativeElement.querySelector('.animal-list__table--disabled');
    expect(tableEl).toBeTruthy();
    expect(tableEl.children.length).toBe(5);

    for (const childEl of Array.from(tableEl.children)) {
      expect(childEl.tagName.toLowerCase()).toBe('app-animal-card-placeholder');
    }

    tick(200);
  }));

  it('should should display the animal items', () => {
    fixture.detectChanges();

    const tableEl: HTMLElement = fixture.nativeElement.querySelector('.animal-list__table');
    expect(tableEl).toBeTruthy();
    expect(tableEl.children.length).toBe(animalListItemsMock().length);

    for (const childEl of Array.from(tableEl.children)) {
      expect(childEl.tagName.toLowerCase()).toBe('app-animal-card');
    }

    expect(tableEl.classList.contains('animal-list__table--disabled')).toBeFalse();
  });

  it('should display an empty container when there are no items', () => {
    fetchListSpy.and.returnValue(of({ items: [] }));
    fixture.detectChanges();

    const messageEl: HTMLElement = fixture.nativeElement.querySelector('.animal-list__message__title');
    expect(messageEl).toBeTruthy();
    expect(messageEl.textContent).toBe('No animals available');
  });

  it('should display an error container when there is an error while fetching items', () => {
    fetchListSpy.and.returnValue(throwError(() => 'error'));
    fixture.detectChanges();

    const messageEl: HTMLElement = fixture.nativeElement.querySelector('.animal-list__message__title');
    expect(messageEl).toBeTruthy();
    expect(messageEl.textContent).toBe('Ops! Something went wrong');
  });

  it('should fetch the animal list again when clicking on update button on a filled list', fakeAsync(() => {
    fixture.detectChanges();

    fetchListSpy.and.callFake(() => timer(200).pipe(map(() => animalListMock())));

    const buttonEl: HTMLButtonElement = fixture.nativeElement.querySelector('.animal-list__action');

    buttonEl.click();
    fixture.detectChanges();

    expect(fetchListSpy).toHaveBeenCalledTimes(2);

    const tableEl: HTMLElement = fixture.nativeElement.querySelector('.animal-list__table');
    expect(tableEl).toBeTruthy();
    expect(tableEl.children.length).toBe(animalListItemsMock().length);

    for (const childEl of Array.from(tableEl.children)) {
      expect(childEl.tagName.toLowerCase()).toBe('app-animal-card');
    }

    expect(tableEl.classList.contains('animal-list__table--disabled')).toBeTrue();

    tick(200);
  }));

  it('should fetch the animal list again when clicking on update button on the empty container', () => {
    fetchListSpy.and.returnValue(of({ items: [] }));
    fixture.detectChanges();

    const buttonEl: HTMLButtonElement = fixture.nativeElement.querySelector('.animal-list__action');

    buttonEl.click();
    fixture.detectChanges();

    expect(fetchListSpy).toHaveBeenCalledTimes(2);
  });

  it('fetch the animal list again when clicking on update button on the error container', () => {
    fetchListSpy.and.returnValue(throwError(() => 'error'));
    fixture.detectChanges();

    const buttonEl: HTMLButtonElement = fixture.nativeElement.querySelector('.animal-list__action');

    buttonEl.click();
    fixture.detectChanges();

    expect(fetchListSpy).toHaveBeenCalledTimes(2);
  });
});
