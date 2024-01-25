import {Component, inject, OnInit} from '@angular/core';
import {Music} from "../../../core/models/music.model";
import {debounceTime, Observable} from "rxjs";
import {HomeService} from "../services/home-service.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {CurrentMusic} from "../../../store/reducers/reducers";
import {changeCurrentPlayingMusic} from "../../../store/actions/actions";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  musicList$!: Observable<Music[]>
  homeService: HomeService = inject(HomeService);
  router: Router = inject(Router)
  store:Store<{currentPlayingMusic:CurrentMusic}> = inject(Store<{currentPlayingMusic:CurrentMusic}>)

  ngOnInit() {
   this.musicList$ = this.homeService.getAllMusic()
  }

  filterMusic(parameter: string) {
    if(parameter === 'trending')
      this.musicList$ = this.homeService.getAllMusic()
    else
      this.musicList$ = this.homeService.getFilteredMusic(parameter);
  }

  searchMusic(searchedMusicInfo: string) {
   this.musicList$ = this.homeService.getSearchingMusic(searchedMusicInfo)
  }



  async startPlaying(music:Music) {
    this.store.dispatch(changeCurrentPlayingMusic({music:music}))
    await this.router.navigate(['/music'])
  }

}
