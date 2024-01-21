import {Component, inject} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  authService:AuthService = inject(AuthService)
  router:Router = inject(Router)
  async logout() {
    this.authService.logout()
    await this.router.navigateByUrl('/home')
  }
}
