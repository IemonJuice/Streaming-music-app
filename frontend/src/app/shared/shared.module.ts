import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UploadedMusicComponent} from "./uploaded-music/uploaded-music.component";
import {MusicComponent} from "./music/music.component";
import {RouterLink} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [UploadedMusicComponent,MusicComponent],
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  exports:[UploadedMusicComponent,MusicComponent]
})
export class SharedModule { }
