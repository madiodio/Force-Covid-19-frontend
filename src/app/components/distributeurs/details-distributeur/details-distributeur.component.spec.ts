import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDistributeurComponent } from './details-distributeur.component';

describe('DetailsDistributeurComponent', () => {
  let component: DetailsDistributeurComponent;
  let fixture: ComponentFixture<DetailsDistributeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsDistributeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDistributeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
