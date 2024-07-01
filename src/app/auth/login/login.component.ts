import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/model/user';
import { LoginResponse } from 'src/app/shared/model/login-response';
import { LoginService } from 'src/app/shared/service/login.service';
import { jwtDecode } from 'jwt-decode';
import { Route, Router, Routes } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public service: LoginService,private router:Router) { }

  ngOnInit(): void {
  }


  //---------------------------------------------------------------------------------------------------------------------------------
  //#region Get Credentials

  //here we need to declare and instance to map the credentials entered by the user 
  userCredentials: User = new User();
  // then we need a instance to store the response ie details of the person logged in if He is valid.
  loginRespone : LoginResponse = new LoginResponse();

  //-------------------------------------

  // Then we need  a method to map the values from the form to the instance and then pass the values to the service layer.
  OnSubmit(form: NgForm): void {

    console.log('The form is submitted and the values recieved are ', form.value);

    // then we need to subscribe to a observable in the service

    if (form.value) {
      // making sure that the form contains value.
      this.service.ValidateUser(form.value)
        .subscribe((response: any) => {

          // if control enters this block then response is recieved.
          console.log('The response recieved when subscribing to the observable is : ', response);

          // then we need to know if the response is a success of Failed one 
          if (response.Success == 0) {
            // so if control enters this block it means that the Success Status is 0 and there is no response 
            // we need to show error message(ie the Status message recieved form the Api) to user
            console.log('There is a problem the Success status recieved is 0 : Something went wrong.The error message recieved is ' + response.StatusMessage);

          }
          else {
            // if control enters this block it means that we have recived a success one

            // so if the response if Success we need to get the details of the user and redirect him to particular page.

            this.loginRespone = response.Resp; //mapping the respons to global instance 

            // then we need to get the details of the logged in user from the Token 
            const token = this.loginRespone.Token;

            //before decoding we need to save the Token to the Local storage to acess it.
            localStorage.setItem('Token',token); // this will save the token to the local storage.

            //then we need to Parse the Token and store it 
            const parsedToken:any = jwtDecode(token);

            // then we need to redired the User Based on the Role

            if(parsedToken.role=='Employee'){
            
              // id control enters this block it means that he is an Employee and we need to send Him to his page
              this.router.navigate(['/employee']);
              // this will navigate to the Employee Component page.

            }
            else if (parsedToken.role =='Admin'){
              // if the role is admin we need to Redirect the user to the Admin page.
            }

          }

        },
          (error) => {
            console.log('Some Error occured while sending the request of Loging in');
          })

    }
    else{
      // if control enters this block it means that the form is Empty
    }

  }

  //#endregion


}
