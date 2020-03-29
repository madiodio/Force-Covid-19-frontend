import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDistributeurComponent } from './list-distributeur.component';

describe('ListDistributeurComponent', () => {
  let component: ListDistributeurComponent;
  let fixture: ComponentFixture<ListDistributeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDistributeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDistributeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
