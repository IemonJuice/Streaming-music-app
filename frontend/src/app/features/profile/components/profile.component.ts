import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {Profile} from "../../../core/models/profile.model";
import {Store} from "@ngrx/store";
import {getUserProfileAction} from "../../../store/actions/actions";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../shared/users/user.service";




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  animations: [
    trigger('fromBottomToTop', [
      state('void', style({
        transform: 'translateY(100%)'
      })),
      transition('void <=> *', animate(500)),
    ]),
  ]
})
export class ProfileComponent implements OnInit, OnDestroy {

  profileID!: number;
  profile!: Observable<Profile>
  authService: AuthService = inject(AuthService)
  router: Router = inject(Router)
  store: Store<{ userProfile: Profile }> = inject(Store<{ userProfile: Profile }>)
  authSubscription!: Subscription;
  isFullInformationVisible: boolean = false;
  isNotEditableUserInfo:boolean = true
  usersService:UserService = inject(UserService);
  profileForm:FormGroup = inject(FormBuilder).group({
    id:[null,[Validators.required]],
    dateOfRegistration:[null,[Validators.required]],
    firstName:[null,[Validators.required]],
    username:[null,[Validators.required]],
    email:[null,[Validators.required]],
  })

  ngOnInit(): void {
    this.authService.getProfile()
    this.profile = this.authService.getProfile()
    this.authSubscription = this.authService.getProfile().subscribe({
      next: (profile) => {

        this.profileID = profile.id;

        this.store.dispatch(getUserProfileAction({profile: profile}))

        this.profileForm.get('dateOfRegistration')?.setValue(profile.dateOfRegistration)
        this.profileForm.get('firstName')?.setValue(profile.firstName)
        this.profileForm.get('email')?.setValue(profile.email)
        this.profileForm.get('username')?.setValue(profile.username)
        this.profileForm.get('id')?.setValue(profile.id)

        this.profileForm.disable();
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

  changeIsEditableUserInfo() {

    this.isNotEditableUserInfo = !this.isNotEditableUserInfo;
    if(this.profileForm.disabled){
      this.profileForm.enable()
      this.profileForm.get('id')?.disable()
      this.profileForm.get('dateOfRegistration')?.disable()
    }
    else{
      if(this.profileForm.valid){
        this.usersService.changeProfileInfo(this.profileForm.getRawValue())
      }
      this.profileForm.disable()
    }
  }
}
