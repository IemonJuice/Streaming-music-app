import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Profile} from "../../../core/models/profile.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  profile!:Observable<Profile>
  authService:AuthService = inject(AuthService)
  router:Router = inject(Router)

  ngOnInit(): void {
    this.authService.getProfile()
    this.profile = this.authService.getProfile()
  }


  async logout() {
    this.authService.logout()
    await this.router.navigateByUrl('/home')
  }

}
