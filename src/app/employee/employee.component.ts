import { Component, Injectable, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/service/employee.service';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})


export class EmployeeComponent implements OnInit {

  constructor(public service:EmployeeService) { }

  ngOnInit(): void {
  }


  //-----------------------------------------------------------------------------
  //#region  Open and Close Modals

  //--------------------------------

  // this methods are used to control the Style of the modal to show them or hide them
  OpenModal() {

     // along with that we need to sort the list to todays list again 
     const today:string = new Date().toISOString().split('T')[0];// getting todays date

     // then we need to call a method in service to get the list for todays date
     this.service.GetTimeEntriesOfEmployee(today);

     // then we need to show Modal
    const modal = document.getElementById('addModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }


    
  }

  CloseModal() {
    const modal = document.getElementById('addModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }


  //#endregion



}
