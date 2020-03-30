import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBeneficiaireComponent } from './details-beneficiaire.component';

describe('DetailsBeneficiaireComponent', () => {
  let component: DetailsBeneficiaireComponent;
  let fixture: ComponentFixture<DetailsBeneficiaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsBeneficiaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBeneficiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
