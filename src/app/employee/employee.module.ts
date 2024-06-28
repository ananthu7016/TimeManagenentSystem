import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { TimeEntryListComponent } from './time-entry-list/time-entry-list.component';
import { TimeEntryAddComponent } from './time-entry-add/time-entry-add.component';
import { TimeEntryUpdateComponent } from './time-entry-update/time-entry-update.component';


@NgModule({
  declarations: [EmployeeComponent, TimeEntryListComponent, TimeEntryAddComponent, TimeEntryUpdateComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
