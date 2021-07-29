import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SusViewUrlsComponent } from './sus-view-urls.component';

describe('SusViewUrlsComponent', () => {
  let component: SusViewUrlsComponent;
  let fixture: ComponentFixture<SusViewUrlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SusViewUrlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SusViewUrlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
