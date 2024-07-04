import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { TimeEntry } from 'src/app/shared/model/time-entry';
import { EmployeeService } from 'src/app/shared/service/employee.service';

@Component({
  selector: 'app-time-entry-update',
  templateUrl: './time-entry-update.component.html',
  styleUrls: ['./time-entry-update.component.scss']
})
export class TimeEntryUpdateComponent implements OnInit {

  constructor(public service: EmployeeService, private formBuider: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.formBuider.group({
      ProjectId: ['', Validators.required],
      ActivityId: ['', Validators.required],
      TimeSpend: ['',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(8)
        ]]
      ,
      Description: ['',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(200)
        ]]
    })
  }

  //----------------------------------------------------------------------------------------------------------------------------------
  //#region On change of Projects we need to Fill the Details of Activities based on the selected project

  // declaring a field to store the details of selected project Id
  selectedProjectId: number = 0;
  //---------------------------------------

  // this method is called when there is a change in the dropdown and when this method is called we need to get the value of 
  // of the selected item and pass it to the service layer to get the details of Activities
  FillActivitiesDropdown(): void {

    console.log('The Projects selected has the id ', this.selectedProjectId);

    // then we need to call a method in the service layer to get the details of Activities based on the selected project
    this.service.GetAllActivitiesForDropdown(this.selectedProjectId);

  }

  //#endregion


  //---------------------------------------------------------------------------------------------------------------------------------
  //#region Update a Entry Report

  //we need a instance to map the details in the form 
  updatedTimeEntry: TimeEntry = {TimeEntryId:0,TimeSpend:0,Description:'',ActivityId:0,EntryDate:new Date()};
  form: FormGroup;
  //-------------------------------------------

  UpdateTimeEntry() {

    console.log('The form for updating the time entry has been submitted and the new Data recieved is :', this.form.value);

    //then we need to subscribe to the observable 

    this.service.EditTimeEntry(this.form.value)
      .subscribe((response) => {

        // if control enters this block then response is recieved.
        console.log('The response recieved when subscribing to the observable is : ', response);

        // then we need to know if the response is a success of Failed one 
        if (response.Success == 0) {
          // so if control enters this block it means that the Success Status is 0 and there is no response 
          // we need to show error message(ie the Status message recieved form the Api) to user
          console.log('There is a problem the Success status recieved is 0 : Something went wrong.The error message recieved is -' + response.StatusMessage);

        }
        else if(response.Success == 1) {
          // if control enters this block it means that we have recived a success one

          // so after the editing is successfull we need to refresh the List so that new Values will be there in the list
          console.log('The request to refresh the List for the selected date is called with the date ',this.service.selectedDateInString);
          this.service.GetTimeEntriesOfEmployee(this.service.selectedDateInString);
        }


      })

  }
  //#endregion


  //---------------------------------------------------------------------------------------------------------------------------------
  //#region Check if Time Exceeds 8 hours 

  timeSpend: number = 0;
  errorTimeLimit: string = '';
  isFormDisabled: boolean = false; // to make the button diabled and enable based on the Count.
  //-------------------

  CheckTimeLimit() {

    this.timeSpend = this.form.get('TimeSpend').value;
    console.log(this.timeSpend);

    if (this.timeSpend + this.service.totalWorkedHours > 8) {
      this.errorTimeLimit = 'Time Exceed 8 Hrs';
      this.isFormDisabled = true;

    }
    else {
      this.errorTimeLimit = '';
      this.isFormDisabled = false;
    }
  }

  //#endregion



}
