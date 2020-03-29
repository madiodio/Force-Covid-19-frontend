import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FromDistributeurComponent } from './from-distributeur.component';

describe('FromDistributeurComponent', () => {
  let component: FromDistributeurComponent;
  let fixture: ComponentFixture<FromDistributeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FromDistributeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FromDistributeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
