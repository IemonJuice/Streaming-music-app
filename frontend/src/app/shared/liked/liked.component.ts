import {Component, inject, OnInit} from '@angular/core';
import {MusicService} from "../upload/music.service";
import {Store} from "@ngrx/store";
import {Profile} from "../../core/models/profile.model";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Music} from "../../core/models/music.model";

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrl: './liked.component.scss'
})
export class LikedComponent implements OnInit {
  private musicPlayerService: MusicService = inject(MusicService)
  private store: Store<{ userProfile: Profile }> = inject(Store<{ userProfile: Profile }>)
  private router: Router = inject(Router)
  likedMusic!:Observable<Music[]>
  ngOnInit() {
    this.store.select('userProfile').subscribe({
      next: async (profile) => {
        this.likedMusic = await this.musicPlayerService.getLikedMusic(profile.id)
      },
      error: async (err) => {
       await this.router.navigateByUrl('auth')
      }
    })
  }
}
