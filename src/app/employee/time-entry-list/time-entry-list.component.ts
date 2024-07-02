import { Component, OnInit } from '@angular/core';
import { TimeEntryDetail } from 'src/app/shared/model/time-entry-detail';
import {EmployeeService} from 'src/app/shared/service/employee.service';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-time-entry-list',
  templateUrl: './time-entry-list.component.html',
  styleUrls: ['./time-entry-list.component.scss']
})
export class TimeEntryListComponent implements OnInit {

  //----------------------
  //some instances
  today:string='';

  // so here we need to access the service layer of employee so to get the instance of service we can use DI
  constructor(public service:EmployeeService,private formBuilder:FormBuilder) { 
  }


  ngOnInit(): void {

    // when this page loads we need to get the details of Todays Time Entries 
     this.today = new Date().toISOString().split('T')[0];// getting todays date

    // then we need to call a method in service to get the list for todays date
    this.service.GetTimeEntriesOfEmployee(this.today);
    console.log('Date : Today is : ',this.today);

    //then we need to make the selected date as todays date
    this.selectedDateInString = this.today

    this.service.CheckRemainingTime();
 
   
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


  // then we need to show the modal form 
  this.OpenModal();
  

}

//#endregion



//---------------------------------------------------------------------------------------------------------------------------------
//#region Get Details of Time Entry to delete

// this is a function to delete a entry corresponding to the recieved entry id 
DeleteTimeEntry(entryId:number){

  console.log('The Entry Id recieved to delete a record is : ',entryId);

  // then we need to call a observable in the service 

  this.service.DeleteTimeEntry(entryId)
  .subscribe((response:any)=>{

    // if control enters this block then response is recieved.
    console.log('The response recieved when subscribing to the observable is : ', response);

    // then we need to know if the response is a success of Failed one 
    if (response.Success == 0) {
      // so if control enters this block it means that the Success Status is 0 and there is no response 
      // we need to show error message(ie the Status message recieved form the Api) to user
      console.log('There is a problem the Success status recieved is 0 : Something went wrong.The error message recieved is -' + response.StatusMessage);
    }
    else if(response.Success==1){
      // if control enters this block it means that we have recived a success one
      
      // so we need to reload the List now based on the new Details 

      this.service.GetTimeEntriesOfEmployee(this.selectedDateInString);
      console.log('The request to reload the List for the date ',this.selectedDateInString);
    }

  })
}

//#endregion


//------------------------------------------------------------------------------------------------------------------------------------
//#region Trigger Modal 

OpenModal() {
  const modal = document.getElementById('editModal');
  if (modal) {
    modal.classList.add('show');
    modal.style.display = 'block';
  }
}

CloseModal() {
  const modal = document.getElementById('editModal');
  if (modal) {
    modal.classList.remove('show');
    modal.style.display = 'none';
  }
}



//#endregion

}
