import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(private router:Router) { }


  ngOnInit(): void {

    // so when this page is loaded we need to get the name of the userlogged in from local storage
    this.userLoggedIn = localStorage.getItem('Name');
  }

  //--------------------------------------------------------------------------------------------------------------------------------
//#region Log Out
userLoggedIn:string='Anonymous';
//-------------------
// so when this function is called we have the redirect the user to the Login page 
LogOut():void{
  
  console.log('Has recieved a request to Logout ');

  // then we need to redirect the user to the Login Page
  this.router.navigate(['/auth/login']);

  // then we need to remove the token from the local storage 
  localStorage.removeItem('Token'); // this will save the token to the local storage.
  localStorage.removeItem('Name');

}

//#endregion


}
