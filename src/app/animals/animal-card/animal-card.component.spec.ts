import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AnimalCardComponent } from './animal-card.component';
import { animalListItemMock } from '@app/animals/shared/tests/mocks/animals.mock';
import { RouterTestingModule } from '@angular/router/testing';

describe('AnimalCardComponent', () => {
  let component: AnimalCardComponent;
  let fixture: ComponentFixture<AnimalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalCardComponent],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AnimalCardComponent);
    component = fixture.componentInstance;
    component.animal = animalListItemMock();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load images in lazy load mode', () => {
    fixture.detectChanges();

    const imageEl: HTMLImageElement = fixture.nativeElement.querySelector('img.card__image');
    expect(imageEl.loading).toBe('lazy');
  });

  it('should have a link for the of the animal details', waitForAsync(async () => {
    component.clickable = true;
    fixture.detectChanges();

    const linkEl: HTMLLinkElement = fixture.nativeElement.querySelector('a');
    expect(linkEl).toBeTruthy();
    expect(linkEl.href.endsWith(`/${animalListItemMock().id}`)).toBeTrue();

    const cardEl = linkEl.querySelector('.card') as HTMLElement;
    expect(cardEl).toBeTruthy();
    expect(cardEl.classList.contains('card--clickable'));
  }));

  it('should have large size', () => {
    component.large = true;
    fixture.detectChanges();

    const cardEl: HTMLElement = fixture.nativeElement.querySelector('.card');
    expect(cardEl).toBeTruthy();
    expect(cardEl.classList.contains('card--lg'));
  });
});
