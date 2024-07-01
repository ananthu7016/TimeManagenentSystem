import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
// this is the service layer for Login componets 

  constructor( private httpClient:HttpClient) { }


//--------------------------------------------------------------------------------------------------------------------------------
//#region Validate User 
// this observable is subscribed when the user enters the login credentials and then hits Login 

ValidateUser(userCredential:User):Observable<any>{
  return this.httpClient.post('',userCredential);
}

//#endregion


}
