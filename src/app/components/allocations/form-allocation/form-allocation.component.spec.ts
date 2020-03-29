import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAllocationComponent } from './form-allocation.component';

describe('FormAllocationComponent', () => {
  let component: FormAllocationComponent;
  let fixture: ComponentFixture<FormAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
