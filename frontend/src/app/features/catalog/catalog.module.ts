import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterModule} from "@angular/router";
import {routes} from "./catalog.routes";
import { CatalogComponent } from './components/catalog.component';



@NgModule({
  declarations: [
    CatalogComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgOptimizedImage
    ]
})
export class CatalogModule { }
