import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUtilisateurComponent } from './form-utilisateur.component';

describe('FormUtilisateurComponent', () => {
  let component: FormUtilisateurComponent;
  let fixture: ComponentFixture<FormUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUtilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
