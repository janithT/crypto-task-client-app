import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatInputFieldComponent } from './mat-input-field.component';

describe('MatInputFieldComponent', () => {
  let component: MatInputFieldComponent;
  let fixture: ComponentFixture<MatInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatInputFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
