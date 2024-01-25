import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterModule} from "@angular/router";
import {routes} from "./catalog.routes";
import { CatalogComponent } from './components/catalog.component';
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [
    CatalogComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgOptimizedImage,
        SharedModule
    ]
})
export class CatalogModule { }
