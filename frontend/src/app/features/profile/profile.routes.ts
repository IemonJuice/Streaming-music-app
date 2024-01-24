import {Routes} from "@angular/router";
import {ProfileComponent} from "./components/profile.component";
import {UploadedMusicComponent} from "../../shared/uploaded-music/uploaded-music.component";

export const routes: Routes = [
  {path: '',component:ProfileComponent},
  {path: 'uploaded',component:UploadedMusicComponent},
]
