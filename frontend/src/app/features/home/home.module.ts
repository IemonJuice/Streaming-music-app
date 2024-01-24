import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './componenets/home.component';
import {RouterModule} from "@angular/router";
import {routes} from "./home.routes";
import {NavBarModule} from "../nav-bar/nav-bar.module";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    HomeComponent,
  ],

  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    NavBarModule
  ]
})
export class HomeModule {
}
