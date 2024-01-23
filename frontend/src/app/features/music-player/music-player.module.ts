import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicPlayerComponent } from './components/music-player.component';
import {RouterModule} from "@angular/router";
import {routes} from "./routes";
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    MusicPlayerComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatSlider,
        MatSliderThumb,
        FormsModule
    ]
})
export class MusicPlayerModule { }
