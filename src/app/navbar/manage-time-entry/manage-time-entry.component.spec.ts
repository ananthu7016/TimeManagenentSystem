import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTimeEntryComponent } from './manage-time-entry.component';

describe('ManageTimeEntryComponent', () => {
  let component: ManageTimeEntryComponent;
  let fixture: ComponentFixture<ManageTimeEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTimeEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTimeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
