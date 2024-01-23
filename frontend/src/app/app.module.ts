import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import {provideStore, StoreModule} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {CoreModule} from "./core/core.module";
import {NavBarModule} from "./features/nav-bar/nav-bar.module";
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "./core/interceptors/auth-interceptor.interceptor";
import {currentPlayingMusicReducer} from "./store/reducers/reducers";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({currentPlayingMusic:currentPlayingMusicReducer}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    NavBarModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withFetch(),withInterceptors([authInterceptor])),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
