import {Component, inject, OnInit} from '@angular/core';
import {Music} from "../../../core/models/music.model";
import {Observable} from "rxjs";
import {HomeService} from "../services/home-service.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {CurrentMusic} from "../../../store/reducers/reducers";
import {changeCurrentPlayingMusic} from "../../../store/actions/actions";
import {Profile} from "../../../core/models/profile.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  musicList$!: Observable<Music[]>
  homeService: HomeService = inject(HomeService);
  router: Router = inject(Router)
  musicStore: Store<{ currentPlayingMusic: CurrentMusic }> = inject(Store<{ currentPlayingMusic: CurrentMusic }>)
  profileStore: Store<{ userProfile: Profile }> = inject(Store<{ userProfile: Profile }>)
  likedMusic!:Music[]
  isLikeClicked: boolean = false;

  ngOnInit() {
    this.musicList$ = this.homeService.getAllMusic()
    this.profileStore.select('userProfile').subscribe({
      next:(profile) => {
        this.likedMusic = profile.likedMusic!;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  filterMusic(parameter: string) {
    if (parameter === 'trending')
      this.musicList$ = this.homeService.getAllMusic()
    else
      this.musicList$ = this.homeService.getFilteredMusic(parameter);
  }

  searchMusic(searchedMusicInfo: string) {
    this.musicList$ = this.homeService.getSearchingMusic(searchedMusicInfo)
  }


  async startPlaying(music: Music) {
    this.musicStore.dispatch(changeCurrentPlayingMusic({music: music}))
    await this.router.navigate(['/music'])
  }

  checkIsLikedMusic(music:Music) {
    return this.likedMusic!.find(value => value.id === music.id)
  }
}
