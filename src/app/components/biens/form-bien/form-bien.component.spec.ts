import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBienComponent } from './form-bien.component';

describe('FormBienComponent', () => {
  let component: FormBienComponent;
  let fixture: ComponentFixture<FormBienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
