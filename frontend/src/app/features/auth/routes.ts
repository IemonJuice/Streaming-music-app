import {Routes} from "@angular/router";
import {AuthComponent} from "./components/auth/auth.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";

export const routes: Routes = [
  {
    path: '', component: AuthComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  }
]
