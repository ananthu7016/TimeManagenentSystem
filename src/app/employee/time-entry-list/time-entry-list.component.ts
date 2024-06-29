import { Component, OnInit } from '@angular/core';
import { TimeEntryDetail } from 'src/app/shared/model/time-entry-detail';
import {EmployeeService} from 'src/app/shared/service/employee.service'

@Component({
  selector: 'app-time-entry-list',
  templateUrl: './time-entry-list.component.html',
  styleUrls: ['./time-entry-list.component.scss']
})
export class TimeEntryListComponent implements OnInit {

  // so here we need to access the service layer of employee so to get the instance of service we can use DI
  constructor(public service:EmployeeService) { 
  }

  ngOnInit(): void {
  }

  //---------------------------------------------------------------------------------------------------------------------------------
  //#region Get All Time Entries Using Date 
  // this method is responsible to populate the List of time entries using the date provided 

  GetTimeEntriesOfEmployee():void{

    // so we need to call the method in the service to get the values and to this method we need to pass date as argument
   // this.service.GetTimeEntriesOfEmployee("Date");

  }

  //#endregion
 

  //---------------------------------------------------------------------------------------------------------------------------------
  //#region Swich Dates for selecting the List
  //declaring an instance to store the selected date 
  selectedDate:Date = new Date();
  selectedDateInString: string=''; // this is to store the string in plane text
  //--------------------------------


  // this method is used to get the selected date from the Calender and conver to String  
  //this method will be called whenever there is a change in the calender.
  GetSelectedDate():void{
   
    this.selectedDateInString = this.selectedDate.toString();
    console.log('The Selected Date is ',this.selectedDateInString);

    // then we need to call a method in the service to get the details of the TimeEntries for the particular selected date 
    this.service.GetTimeEntriesOfEmployee(this.selectedDateInString);


  }

  //#endregion



//---------------------------------------------------------------------------------------------------------------------------------
//#region Get Details of Time Entry to Edit 

// this method is used to get details of the selected Time Entry for Editing
EditATimeEntry(timeEntry:TimeEntryDetail){

  console.log('The Time Entry Selected to Edit is ',timeEntry);

  // then we need to assign this to a global instance in the service so that the edit component can access it.
  this.service.selectedTimeEntry = timeEntry;

}

//#endregion

}
