import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {CookieService} from "ngx-cookie-service";
import {LoginResponse} from "../../../../core/models/login-response.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]
})
export class LoginComponent {
  cookieService:CookieService = inject(CookieService)
  isErrorFromServer: boolean = false;

  errorMessage: string ='';

  authService:AuthService = inject(AuthService);

  form: FormGroup = inject(FormBuilder).group({
    username:[null,[Validators.required,Validators.min(8)]],
    password:[null,[Validators.required,Validators.min(8)]]
  });


  submitLoginForm() {
    if(this.form.valid){
      this.authService.login(this.form.getRawValue()).subscribe({
        next: (response:LoginResponse) => {
          this.cookieService.set('token',response.token)
        },
        error: (err) => {
          this.isErrorFromServer = true;
          this.errorMessage = err.error.message
        }
      })
    }
  }
}
