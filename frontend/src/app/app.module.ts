import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {CoreModule} from "./core/core.module";
import {NavBarModule} from "./features/nav-bar/nav-bar.module";
import {provideHttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,

    StoreModule.forRoot({}, {}),

    EffectsModule.forRoot([]),

    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    NavBarModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(),

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
