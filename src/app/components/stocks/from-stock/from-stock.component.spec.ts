import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FromStockComponent } from './from-stock.component';

describe('FromStockComponent', () => {
  let component: FromStockComponent;
  let fixture: ComponentFixture<FromStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FromStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FromStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
