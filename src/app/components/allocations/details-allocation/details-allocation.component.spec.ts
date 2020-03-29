import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAllocationComponent } from './details-allocation.component';

describe('DetailsAllocationComponent', () => {
  let component: DetailsAllocationComponent;
  let fixture: ComponentFixture<DetailsAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
