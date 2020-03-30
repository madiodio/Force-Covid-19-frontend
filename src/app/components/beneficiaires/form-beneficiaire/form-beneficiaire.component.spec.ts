import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBeneficiaireComponent } from './form-beneficiaire.component';

describe('FormBeneficiaireComponent', () => {
  let component: FormBeneficiaireComponent;
  let fixture: ComponentFixture<FormBeneficiaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBeneficiaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBeneficiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
