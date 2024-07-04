import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {

    // so when the page loads we need to hide the card 
    this.HideCardUser();
    this.HideCardAdd();
  }





//------------------------------------------------------------------------------------------------------------------------------------
//#region  Open and CLose Navbar
isColapsed:boolean=false;
//-------------------------

ToogleNavbar(){
  this.isColapsed = !this.isColapsed;
}

//#endregion



//------------------------------------------------------------------------------------------------------------------------------------
//#region To Hide/Show the card User
HideCardUser() {
  let card = document.getElementById('cardUser');
  if (card) {
    card.style.display = 'none';
  }
}

ShowCardUser(){
  let card = document.getElementById('cardUser');
  if(card){
    card.style.display ='block';
  }
}
//#endregion


//------------------------------------------------------------------------------------------------------------------------------------
//#region To Hide/Show the card User
HideCardAdd() {
  let card = document.getElementById('addEntryCard');
  if (card) {
    card.style.display = 'none';
  }
}

ShowCardAdd(){
  let card = document.getElementById('addEntryCard');
  if(card){
    card.style.display ='block';
  }
}
//#endregion










}
