import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimeEntryDetail } from 'src/app/shared/model/time-entry-detail';
import { DropDownDetail } from 'src/app/shared/model/drop-down-detail';
import { error } from '@angular/compiler/src/util';
import { TimeEntry } from '../model/time-entry';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // this is the service layer of Employee this layer is responsible to interact with Api and manages Data.

  constructor(private httpClient: HttpClient) { }


  //---------------------------------------------------------------------------------------------------------------------------------
  //#region Get All Time Entries Using Date 

  //Declaring a gloabal array to store the details of the response recived from the API Call for getting TimeEntries
  listOfTimeEnties: TimeEntryDetail[] = [
    {  TimeEntryId : 1,ProjectName: 'Project A',TimeSpend: 3,ActivityId:1,Description:'This is a Description',ActivityName:'Activity A',ProjectId:1},
    {  TimeEntryId : 2,ProjectName: 'Project A',TimeSpend: 2,ActivityId:2,Description:'This is a Description',ActivityName:'Activity B',ProjectId:1},
    {  TimeEntryId : 3,ProjectName: 'Project A',TimeSpend: 1,ActivityId:3,Description:'This is a Description',ActivityName:'Activity C',ProjectId:1},
    {  TimeEntryId : 4,ProjectName: 'Project B',TimeSpend: 0,ActivityId:1,Description:'This is a Description',ActivityName:'Activity A',ProjectId:2},
    {  TimeEntryId : 5,ProjectName: 'Project B',TimeSpend: 0,ActivityId:2,Description:'This is a Description',ActivityName:'Activity B',ProjectId:2},
    {  TimeEntryId : 6,ProjectName: 'Project B',TimeSpend: 0,ActivityId:3,Description:'This is a Description',ActivityName:'Activity C',ProjectId:2},
  ];

  // then we need to store the selected time ie the Latest time recieved to refresh the list 
  selectedDateInString:string='';
  //---------------------------------------------

  // this method is responsible to populate the List of time entries using the date provided 

  GetTimeEntriesOfEmployee(date: string): number {

    // first we need to assign the date recieved to the global varuable so that other functions can access it.
    this.selectedDateInString = date;

    // so we need to call the api to get the values 

    this.httpClient.get('' + date)
      .toPromise()
      .then((response: any) => {

        console.log('We have Recieved a response after sending a request to Get the Details of Time Entires of a Employee of particularDate, The response Recieved is');
        // the response recieved is 
        console.log(response);

        // then we need to know if the response is a success of Filed one 
        if (response.Success == 0) {
          // so if control enters this block it means that the Success Status is 0 and there is no response 
          // we need to show error message(ie the Status message recieved form the Api) to user
          console.log('There is a problem the Success status recieved is 0 : Something went wrong.The error message recieved is -' + response.StatusMessage);

        }
        else {
          // if control enters this block it means that the success status is one ie we have recieved a Valid response from the API call 

          // then we need to assign this value at the Response to a array of instance of Class  

          if (response.Resp) {
            //just making sure that the response is not empty
            try {
              this.listOfTimeEnties = response.Resp;
              // if the values are transfered to the array of instance successfully then it will be automatically two way binded to the list
            }
            catch (e) { console.log(e) }
            // this will log the catched Exception
          }
        }
      })
      .catch((error) => {
        // so if control enters this block it means that there is an error
        // we need to log that error 
        console.log('There was some problems while fetching the details of Time Entries. The error occured is ', error);
      })

      return 0;
  }

  //#endregion



  //-----------------------------------------------------------------------------------------------------------------------------------
  //#region Get Details of All Projects for Dropdown

  //first we need an array to store the details of the Fields which are required to filling up the dropdown for projects 
  listOfProjects: DropDownDetail[] = [

    {Id:1,Name:'Project A'},
    {Id:2,Name:'Project B'},
    {Id:3,Name:'Project C'}

  ]

  //--------------------------------------


  // this method is used to get the details of Projects from the Api to fill up the dropdown

  GetAllProjectsForDropDown(): void {

    this.httpClient.get('')
      .toPromise()
      .then((response: any) => {

        console.log('We have Recieved a response after sending a request to Get the Details of All the Projects to fill in the DropDown, The response Recieved is');
        // the response recieved is 
        console.log(response);

        // then we need to know if the response is a success of Failed one 
        if (response.Success == 0) {
          // so if control enters this block it means that the Success Status is 0 and there is no response 
          // we need to show error message(ie the Status message recieved form the Api) to user
          console.log('There is a problem the Success status recieved is 0 : Something went wrong.The error message recieved is -' + response.StatusMessage);

        }
        else {
          // if control enters this block it means that the response is a valid one 

          // then we need to make sure that the response is not null 
          if (response.Resp) {

            // then we need to map the respons to our global instance array.
            this.listOfProjects = response.Resp;
            console.log('The response is successfully assigned to the Array the Array is :', this.listOfProjects);
          }
        }

      })
      .catch((error) => {
        // this block will catch any error that may arrise and we need to log the error in the console.
        console.log('Some error occured while fetching the details of the Projects to fill in the DropDown, the error occured is ', error);
      })

  }


  //#endregion



  //-----------------------------------------------------------------------------------------------------------------------------------
  //#region Get Details of All Activities of a Projects for DropDown


  //first we need an array to store the details of the Fields which are required to filling up the dropdown for projects 
  listOfActivities: DropDownDetail[] = [

    {Id:1,Name:'Activity A'},
    {Id:2,Name:'Activity B'},
    {Id:3,Name:'Activity C'}

  ];
  //--------------------------------------

  // this method will expect a project id as parameter to get the details of all the activities that are related to a selected project.
  GetAllActivitiesForDropdown(projectId: number) {

    this.httpClient.get('')
      .toPromise()
      .then((response: any) => {

        console.log('We have Recieved a response after sending a request to Get the Details of All the Activities of a project to fill in the DropDown, The response Recieved is');
        // the response recieved is 
        console.log(response);

        // then we need to know if the response is a success of Failed one 
        if (response.Success == 0) {
          // so if control enters this block it means that the Success Status is 0 and there is no response 
          // we need to show error message(ie the Status message recieved form the Api) to user
          console.log('There is a problem the Success status recieved is 0 : Something went wrong.The error message recieved is -' + response.StatusMessage);

        }
        else {
          // if control enters this block it means that the Response we got is a success one 

          // then we need to make sure that the response we got is not null 
          if (response.Resp) {
            // if control enters this block it means that the response is a valid 

            // then we need to assign the respone to the global array 
            this.listOfActivities = response.Resp;

            console.log('The Activities are stored in array the array is ', this.listOfActivities);
          }
        }

      })
      .catch((error) => {
        // this block will catch any error that may occur and log it in the console 
        console.log('There was some error while fetching the details of Activities for the selected projects', error);
      })
  }

  //#endregion



  //-----------------------------------------------------------------------------------------------------------------------------------
  //#region Add a new Time Entry 

  // this method will be called when a new time entry is being added 

  AddNewTimeEntry(timeEntry: TimeEntry): Observable<any> {
    // then  we need to set the Time EntryId of this instance to zero to indicate new Entry
    timeEntry.TimeEntryId = 0;
    console.log('The value recieved in the observable is:', timeEntry);
    return this.httpClient.post('', timeEntry);

  }

  //#endregion




  //---------------------------------------------------------------------------------------------------------------------------------
  //#region  Edit A Time Entry 

  //declaring an instance to store the details of the selected Time Entry 
  selectedTimeEntry: TimeEntryDetail = {  TimeEntryId : 1,ProjectName: 'Project A',TimeSpend: 3,ActivityId:1,Description:'This is a Description',ActivityName:'Activity A',ProjectId:1};

  //------------------------------

  // then we need to define a observable to be called when the time entry is to be edited 

  EditTimeEntry(timeEntry: TimeEntry): Observable<any> {
    timeEntry.EntryDate = new Date();
    console.log('The value recieved in the observable is:', timeEntry);
    return this.httpClient.post('', timeEntry);
  }

  //#endregion



  //---------------------------------------------------------------------------------------------------------------------------------
  //#region  Delete a Time Entry 

  //we need to define a observable to be called when the time entry is to be deleted

  DeleteTimeEntry(timeEntryId: number): Observable<any> {

    console.log('The value recieved in the observable is:', timeEntryId);
    return this.httpClient.delete('' + timeEntryId);
  }
  //#endregion



  //----------------------------------------------------------------------------------------------------------------------------------
  //#region Hide & Unhide Components
  //here we need to declare some boolan fields their values can be used to hide and unhide components

  toogleList: boolean = true; // for toogling the TimeEntry list component
  toogleGrid: boolean = false; // for toogling the Grid size of components 
  toogleAdd: boolean = false; // for toogling the component to add an Entry 
  toogleEdit: boolean = false;// for toogling the Component to Edit an Entr

  //-------------------------------------

  //#endregion




  //---------------------------------------------------------------------------------------------------------------------------------
  //#region Check 8 Hours Reached


  totalWorkedHours:number=0; // to store the total worked hours of a employee in a day.
  //--------------------------------------
  // this method is used to check if the 8 hours mark is reached or not 

  CheckRemainingTime():void{

   this.totalWorkedHours=0;
    //then we need to use a for loop to calculate the total hours worked by a employee from the list we have 
    this.listOfTimeEnties.forEach(e=>{
     this.totalWorkedHours += e.TimeSpend;
    })

    console.log('The Total Hours worked by a Employee is ',this.totalWorkedHours);

  }


  //#endregion



  //----------------------------------------------------------------------------------------------------------------------------------
  //#region Some Fields for Pagination 
  

  //#endregion

}

