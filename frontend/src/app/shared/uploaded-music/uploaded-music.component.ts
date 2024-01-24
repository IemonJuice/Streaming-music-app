import {Component, inject, OnInit} from '@angular/core';
import {Profile} from "../../core/models/profile.model";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

@Component({
  selector: 'app-uploaded-music',
  templateUrl: './uploaded-music.component.html',
  styleUrl: './uploaded-music.component.scss'
})
export class UploadedMusicComponent implements OnInit{
  private store:Store<{userProfile:Profile}> = inject(Store<{userProfile:Profile}> )
  profile!:Observable<Profile>
    ngOnInit(): void {
        this.profile = this.store.select('userProfile')
    }

}
