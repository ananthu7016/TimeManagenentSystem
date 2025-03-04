import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/service/employee.service';
import { TimeEntry } from 'src/app/shared/model/time-entry';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms'; 


@Component({
  selector: 'app-time-entry-add',
  templateUrl: './time-entry-add.component.html',
  styleUrls: ['./time-entry-add.component.scss']
})
export class TimeEntryAddComponent implements OnInit {


  form: FormGroup;
  
  constructor(public service: EmployeeService,private formbuilder: FormBuilder) { }

  ngOnInit(): void {

    // when this page is loaded we need to call the method in the service to getall the detail of Projects
    this.service.GetAllProjectsForDropDown();


    // so we need to set todays date to the calender when the page loads
    const today = new Date().toISOString().split('T')[0];
    console.log('Todays date is ',today);

    // for validating the Reactive form.
    this.form = this.formbuilder.group({
      EntryDate: [today, 
        [
          Validators.required,

        ]], 
      ProjectId: ['', Validators.required], 
      ActivityId: ['', Validators.required], 
      TimeSpend: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(8)
      ]] ,
      Description:['',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(200)
        ]]
    });
    
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



  //--------------------------------------------------------------------------------------------------------------------------------
  //#region Add a new Time Entry 
  // first we need an instance to store and map the data entered by the user in the Form to add a new Time entry
  newTimeEnty: TimeEntry = {TimeEntryId:0,TimeSpend:0,Description:'',ActivityId:0,EntryDate:new Date()};
  //-----------------------------

  // then we need a method to be called when the form is Submitted and then we need to get the values from the form and pass it 
  // to the service layer.
  AddNewTimeEntry() {
    console.log('The form is submitted and the value recievde is :', this.form.value);
    if (this.form.value) {
      //making sure that the form has values 
      // then we need to subscribe to the observable in service 

      this.service.AddNewTimeEntry(this.form.value)
        .subscribe((response: any) => {
          // if control enters this block then response is recieved.
          console.log('The response recieved when subscribing to the observable is : ', response);

          // then we need to know if the response is a success of Failed one 
          if (response.Success == 0) {
            // so if control enters this block it means that the Success Status is 0 and there is no response 
            // we need to show error message(ie the Status message recieved form the Api) to user
            console.log('There is a problem the Success status recieved is 0 : Something went wrong.The error message recieved is -' + response.StatusMessage);

          }
          else{
            // if control enters this block it means that we have recived a success one
            
          }



        })

    }



  }


  //#endregion


  //---------------------------------------------------------------------------------------------------------------------------------
  //#region Check if Time Exceeds 8 hours 
  
   timeSpend:number=0;
   errorTimeLimit:string='';
   isFormDiabled:boolean=false;
  //-------------------
   
  CheckTimeLimit(){

    this.timeSpend = this.form.get('TimeSpend').value;
    console.log(this.timeSpend);

    if(this.timeSpend+this.service.totalWorkedHours>8){
      this.errorTimeLimit='Time Exceed 8 Hrs';
      this.isFormDiabled = true;
    }
    else{
      this.errorTimeLimit='';
      this.isFormDiabled=false;
    }
  }

  //#endregion



  //----------------------------------------------------------------------------------------------------------------------------------
  //#region Validaton for Date
  CheckSelectedDate():void{
  
    console.log('Is the value for date selected in the Reactive form',this.form.controls.EntryDate.value);

    const today:string =  new Date().toISOString().split('T')[0];
    console.log('Todays date is',today)
    if(today < this.form.controls.EntryDate.value){
      // so if control enters this block we need to show error
      document.getElementById('EntryDate').style.borderColor='red';
      this.isFormDiabled = true;
    }
    else{
      document.getElementById('EntryDate').style.borderColor='aqua';
      this.isFormDiabled=false;
    }
  
  
  }


  //#endregion



}
