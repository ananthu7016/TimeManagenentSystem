import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';  
import { AuthComponent } from './auth/auth.component';  

const routes: Routes = [
  {path:'employee',component:EmployeeComponent,loadChildren:()=>import('./employee/employee.module').then(e=>e.EmployeeModule)},
  {path:'auth',component:AuthComponent,loadChildren:()=>import('./auth/auth.module').then(a=>a.AuthModule)},
  {path:'',redirectTo:'auth/login',pathMatch:'full'},// for empty routes 
  {path:'**',redirectTo:'auth/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
