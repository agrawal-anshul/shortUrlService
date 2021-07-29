import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SusGenerateComponent } from './sus-generate.component';

describe('SusGenerateComponent', () => {
  let component: SusGenerateComponent;
  let fixture: ComponentFixture<SusGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SusGenerateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SusGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
