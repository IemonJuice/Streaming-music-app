import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserCredentialsToLogin} from "../../../core/models/user-credentials-to-login.model";
import {environment} from "../../../../environments/environment.development";
import {LoginResponse} from "../../../core/models/login-response.model";
import {UserCredentialsToRegister} from "../../../core/models/user-credentials-to-register.model";
import {RegisterResponse} from "../../../core/models/register-response-model";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {Profile} from "../../../core/models/profile.model";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  cookieService: CookieService = inject(CookieService);

  constructor(private http: HttpClient) {
  }

  login(userToLoginCredentials: UserCredentialsToLogin) {
    return this.http.post<LoginResponse>(environment.base + 'auth' + '/' + 'login', userToLoginCredentials)
  }

  register(userToRegisterCredentials: UserCredentialsToRegister):Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(environment.base + 'auth' + '/' + 'register', userToRegisterCredentials)
  }

  logout() {
    this.cookieService.delete('token');
  }

  getProfile():Observable<Profile> {
    return this.http.get<Profile>(environment.base + 'auth' + '/' + 'profile');
  }

  deleteProfile(id:number) {
    return this.http.delete(environment.base + 'users' + '/' + id).subscribe()
  }
}
