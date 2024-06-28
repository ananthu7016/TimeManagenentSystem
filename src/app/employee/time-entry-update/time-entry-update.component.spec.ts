import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeEntryUpdateComponent } from './time-entry-update.component';

describe('TimeEntryUpdateComponent', () => {
  let component: TimeEntryUpdateComponent;
  let fixture: ComponentFixture<TimeEntryUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeEntryUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEntryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
