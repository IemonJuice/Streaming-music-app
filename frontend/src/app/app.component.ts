import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Profile} from "./core/models/profile.model";
import {AuthService} from "./features/auth/services/auth.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {getUserProfileAction} from "./store/actions/actions";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  authService: AuthService = inject(AuthService)
  store: Store<{ userProfile: Profile }> = inject(Store<{ userProfile: Profile }>)
  authSubscription!: Subscription;

  ngOnInit(): void {
    this.authSubscription = this.authService.getProfile().subscribe({
      next: (profile) => {
        this.store.dispatch(getUserProfileAction({profile: profile}))
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
