import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/service/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(public service:EmployeeService) { }

  ngOnInit(): void {
  }


  //----------------------------------------------------------------------------------------------------------------------------------
  //#region Hide & Unhide Components

  // this function will be called when the Add button is clicked so that the Grid is enabled and add component is shown
  ShowAddComponent():void{

    this.service.toogleList = false;
    this.service.toogleGrid = true;
    this.service.toogleAdd=true;
    this.service.toogleEdit=false;
  }


  //this method is for closing the Grid and showing the list back again 
  CloseGrid():void{

    this.service.toogleList = true;
    this.service.toogleGrid = false;
    this.service.toogleAdd=false;
    this.service.toogleEdit=false;
    
  }

  //#endregion



}
