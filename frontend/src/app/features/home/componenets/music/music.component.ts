import {Component, Input} from '@angular/core';
import { Music } from '../../../../core/models/music.model';
import {animate, state, style, transition, trigger} from '@angular/animations';

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

}
