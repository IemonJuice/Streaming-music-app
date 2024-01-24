import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UploadedMusicComponent} from "./uploaded-music/uploaded-music.component";
import {MusicComponent} from "./music/music.component";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [UploadedMusicComponent,MusicComponent],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports:[UploadedMusicComponent,MusicComponent]
})
export class SharedModule { }
