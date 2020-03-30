import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FromLivreurComponent } from './from-livreur.component';

describe('FromLivreurComponent', () => {
  let component: FromLivreurComponent;
  let fixture: ComponentFixture<FromLivreurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FromLivreurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FromLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
