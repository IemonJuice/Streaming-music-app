import {Component, inject} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Observable} from "rxjs";
import {Music} from "../../../core/models/music.model";

import {HomeService} from "../../home/services/home-service.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]
})
export class CatalogComponent {
  musicService:HomeService = inject(HomeService)
  isCatalogListVisible:boolean = false;
  songs!:Observable<Music[]>
  isLikedListVisible: boolean = false;
  changeCatalogVisibility(genre: string) {
    this.isCatalogListVisible = true;
    this.getSongsByGenre(genre);
  }
  getSongsByGenre(genre:string) {
    this. songs = this.musicService.getFilteredMusic(genre)
  }
}
