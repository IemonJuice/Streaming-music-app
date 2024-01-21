import {Component, inject} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {RegisterResponse} from "../../../../core/models/register-response-model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]
})
export class RegisterComponent {
  cookieService: CookieService = inject(CookieService)
  isErrorFromServer: boolean = false;
  router: Router = inject(Router);
  errorMessage: string = '';

  authService: AuthService = inject(AuthService);

  form: FormGroup = inject(FormBuilder).group({
    username: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    dateOfRegistration: ['', Validators.required],
    firstName: ['', [Validators.required, Validators.minLength(8)]],
  });


  submitRegisterForm() {
    this.form.get('dateOfRegistration')?.setValue(new Date().toString())
    if (this.form.valid) {
      this.authService.register(this.form.getRawValue()).subscribe({
        next: async (response: RegisterResponse) => {
          this.cookieService.set('token', response.token)
          await this.router.navigateByUrl('/home')
        },
        error: (err) => {
          this.isErrorFromServer = true;
          this.errorMessage = err.error.message
        }
      })
    }
  }
}
