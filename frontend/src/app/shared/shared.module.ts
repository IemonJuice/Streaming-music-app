import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UploadedMusicComponent} from "./uploaded-music/uploaded-music.component";
import {MusicComponent} from "./music/music.component";
import {RouterLink} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {LikedComponent} from "./liked/liked.component";



@NgModule({
  declarations: [UploadedMusicComponent,MusicComponent,LikedComponent],
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,

  ],
  exports:[UploadedMusicComponent,MusicComponent,LikedComponent]
})
export class SharedModule { }
