import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Profile} from "../../core/models/profile.model";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http:HttpClient = inject(HttpClient)

  changeProfileInfo(newProfileInfo:Profile) {
    this.http.patch(environment.base + 'users',newProfileInfo).subscribe({
      next:(next) => {
        console.log(next);
      },
      error:(err) => {
        console.log(err)
      }
    });
  }

}
