import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ManageTimeEntryComponent } from './manage-time-entry/manage-time-entry.component';



@NgModule({
  declarations: [NavbarComponent, UserInfoComponent, ManageTimeEntryComponent],
  imports: [
    CommonModule
  ],
  exports:[NavbarComponent]
})
export class NavbarModule { }
