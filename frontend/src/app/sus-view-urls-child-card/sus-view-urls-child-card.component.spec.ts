import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SusViewUrlsChildCardComponent } from './sus-view-urls-child-card.component';

describe('SusViewUrlsChildCardComponent', () => {
  let component: SusViewUrlsChildCardComponent;
  let fixture: ComponentFixture<SusViewUrlsChildCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SusViewUrlsChildCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SusViewUrlsChildCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
