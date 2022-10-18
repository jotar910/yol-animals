import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AnimalItemComponent } from './animal-item.component';
import { animalListItemMock } from '@app/animals/shared/tests/mocks/animals.mock';
import { RouterTestingModule } from '@angular/router/testing';

describe('AnimalItemComponent', () => {
  let component: AnimalItemComponent;
  let fixture: ComponentFixture<AnimalItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalItemComponent],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AnimalItemComponent);
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
    fixture.detectChanges();

    const linkEl: HTMLLinkElement = fixture.nativeElement.querySelector('a');
    expect(linkEl.href.endsWith(`/${animalListItemMock().id}`)).toBeTrue();
    expect(linkEl.querySelector('.card')).toBeTruthy();
  }));
});
