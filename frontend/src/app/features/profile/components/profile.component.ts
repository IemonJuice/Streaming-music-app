import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {Profile} from "../../../core/models/profile.model";
import {Store} from "@ngrx/store";
import {getUserProfileAction} from "../../../store/actions/actions";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {

  profileID!:number;
  profile!: Observable<Profile>
  authService: AuthService = inject(AuthService)
  router: Router = inject(Router)
  store: Store<{ userProfile: Profile }> = inject(Store<{ userProfile: Profile }>)
  authSubscription!: Subscription;

  ngOnInit(): void {
    this.authService.getProfile()
    this.profile = this.authService.getProfile()
    this.authSubscription = this.authService.getProfile().subscribe({
      next: (profile) => {
        this.profileID = profile.id;
        this.store.dispatch(getUserProfileAction({profile: profile}))
      },
      error: (err) => {
        this.authService.logout();
      }
    })
  }

  async logout() {
    this.authService.logout()
    await this.router.navigateByUrl('/home')
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  async deleteProfile() {
    this.authService.deleteProfile(this.profileID)
    this.authService.logout();
    await this.router.navigate(['/home'])
  }
}
