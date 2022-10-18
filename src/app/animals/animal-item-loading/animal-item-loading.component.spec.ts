import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalItemLoadingComponent } from './animal-item-loading.component';

describe('AnimalItemLoadingComponent', () => {
  let component: AnimalItemLoadingComponent;
  let fixture: ComponentFixture<AnimalItemLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalItemLoadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalItemLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
