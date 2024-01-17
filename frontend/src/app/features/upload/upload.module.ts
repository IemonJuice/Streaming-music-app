import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadComponent} from './components/upload.component';
import {RouterModule} from "@angular/router";
import {routes} from "./upload.routes";


@NgModule({
  declarations: [
    UploadComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UploadModule {
}
