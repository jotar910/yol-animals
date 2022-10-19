import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalCardPlaceholderComponent } from './animal-card-placeholder.component';

describe('AnimalCardPlaceholderComponent', () => {
  let component: AnimalCardPlaceholderComponent;
  let fixture: ComponentFixture<AnimalCardPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalCardPlaceholderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AnimalCardPlaceholderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have large size placeholder', () => {
    component.large = true;
    fixture.detectChanges();

    const cardEl: HTMLElement = fixture.nativeElement.querySelector('.card');
    expect(cardEl).toBeTruthy();
    expect(cardEl.classList.contains('card--lg'));
  });
});
