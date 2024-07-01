import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

//--------------------------------------------------------------------------------------------------------------------------------
//#region Log Out

//-------------------
// so when this function is called we have the redirect the user to the Login page 
LogOut():void{
  
  console.log('Has recieved a request to Logout ');

  // then we need to redirect the user to the Login Page
  this.router.navigate(['/auth/login']);

}

//#endregion

}
