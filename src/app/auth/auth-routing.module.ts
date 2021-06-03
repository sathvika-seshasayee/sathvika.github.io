import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoComponent } from '../toDo/toDo.component';
import { LoginDetailsAuthenticationGuard } from './auth-guard.service';
import { AuthenticationService } from './auth.service';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '',  component: LoginComponent },
  { path: 'toDo', component: ToDoComponent } //, canActivate : [LoginDetailsAuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [LoginDetailsAuthenticationGuard, AuthenticationService],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
