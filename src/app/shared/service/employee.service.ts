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
    new TimeEntryDetail(1, 'Project A', 'Coding', 2),
    new TimeEntryDetail(2, 'Project B', 'Testing', 1),
    new TimeEntryDetail(3, 'Project C', 'Design', 3),
  ];
  //---------------------------------------------

  // this method is responsible to populate the List of time entries using the date provided 

  GetTimeEntriesOfEmployee(date: string): void {

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

  }

  //#endregion



  //-----------------------------------------------------------------------------------------------------------------------------------
  //#region Get Details of All Projects for Dropdown

  //first we need an array to store the details of the Fields which are required to filling up the dropdown for projects 
  listOfProjects: DropDownDetail[] = [

    new DropDownDetail(1, 'Project A'),
    new DropDownDetail(2, 'Project C'),
    new DropDownDetail(3, 'Project B')
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

    new DropDownDetail(1, 'Activity A'),
    new DropDownDetail(2, 'Activity C'),
    new DropDownDetail(3, 'Activity B')
  ]

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
  selectedTimeEntry: TimeEntryDetail;// = new TimeEntryDetail();
  //------------------------------

  // then we need to define a observable to be called when the time entry is to be edited 

  EditTimeEntry(timeEntry: TimeEntry): Observable<any> {
    timeEntry.EntryDate = new Date();
    console.log('The value recieved in the observable is:', timeEntry);
    return this.httpClient.post('', timeEntry);
  }

  //#endregion



  //---------------------------------------------------------------------------------------------------------------------------------
//#region  


//#endregion

}

