import {Component, inject, Input, OnInit} from '@angular/core';
import {Music} from '../../../../core/models/music.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NavigationExtras, Router} from "@angular/router";
import {CurrentMusic} from "../../../../store/reducers/reducers";
import {Store} from "@ngrx/store";
import {changeCurrentPlayingMusic} from "../../../../store/actions/actions";

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrl: './music.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]
})
export class MusicComponent {
  @Input() music!: Music;
  router: Router = inject(Router)
  store:Store<{currentPlayingMusic:CurrentMusic}> = inject(Store<{currentPlayingMusic:CurrentMusic}>)


  async startPlaying() {
    this.store.dispatch(changeCurrentPlayingMusic({music:this.music}))
    await this.router.navigate(['/music'])
  }
}
