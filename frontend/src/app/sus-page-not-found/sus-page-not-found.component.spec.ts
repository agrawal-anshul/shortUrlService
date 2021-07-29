import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SusPageNotFoundComponent } from './sus-page-not-found.component';

describe('SusPageNotFoundComponent', () => {
  let component: SusPageNotFoundComponent;
  let fixture: ComponentFixture<SusPageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SusPageNotFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SusPageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
