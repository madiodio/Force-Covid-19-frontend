import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBeneficiaireComponent } from './list-beneficiaire.component';

describe('ListBeneficiaireComponent', () => {
  let component: ListBeneficiaireComponent;
  let fixture: ComponentFixture<ListBeneficiaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBeneficiaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBeneficiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
