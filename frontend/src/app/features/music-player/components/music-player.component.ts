import {AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {CurrentMusic} from "../../../store/reducers/reducers";
import {Store} from "@ngrx/store";
import {Music} from "../../../core/models/music.model";
import {Observable} from "rxjs";
import {MusicPlayerService} from "../services/music-player.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Profile} from "../../../core/models/profile.model";
import {MusicService} from "../../../shared/upload/music.service";


@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]
})
export class MusicPlayerComponent implements OnInit, AfterViewInit {
  @ViewChild('audioElement', {static: false}) audioElement?: ElementRef
  audioSrc: SafeUrl | undefined;
  musicId!: number;
  musicInterval: any;
  isAudioPaused: boolean = true;
  likedMusic: Music[] = []
  isLikedMusic: boolean = false;
  musicLength: number = 0;
  currentTime: any = 0;
  isLoop: boolean = false;
  userID:number = 0;
  musicInfo!: Observable<Music>

  store: Store<{ currentPlayingMusic: CurrentMusic }> = inject(Store<{ currentPlayingMusic: CurrentMusic }>);
  private userStore: Store<{ userProfile: Profile }> = inject(Store<{ userProfile: Profile }>)
  private musicService: MusicService = inject(MusicService)
  private musicPlayerService: MusicPlayerService = inject(MusicPlayerService)
  private sanitizer: DomSanitizer = inject(DomSanitizer)

  ngOnInit() {
    this.musicInfo = this.store.select('currentPlayingMusic')

    this.musicInfo.subscribe(music => {
      this.getMusicFile(music.id)
      this.musicId = music.id;
    })

    this.userStore.select('userProfile').subscribe(user => {
      this.likedMusic = user.likedMusic!;
      this.userID = user.id
    })
    this.checkIsLikedMusic(this.musicId);
  }

  getMusicFile(id: number) {
    this.musicPlayerService.getMusicFile(id).subscribe({
      next: (data: Blob) => {
        this.audioSrc = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(data));
      },
      error: (error) => {
        console.error('Error loading audio file:', error);
      }
    });
  }


  ngAfterViewInit(): void {
    this.audioElement?.nativeElement.addEventListener('loadedmetadata', () => {
      this.musicLength = this.audioElement?.nativeElement.duration.toFixed(0);
    });
  }


  async play(audioElement: HTMLAudioElement) {
    this.isAudioPaused = false;
    await audioElement.play()

    this.musicInterval = setInterval(() => {
      this.musicLength = Number(audioElement.duration.toFixed(0));
      this.currentTime++;
      if (this.musicLength == Number(audioElement.currentTime.toFixed(0))) {

        if (this.isLoop) {
          this.currentTime = 0;
          audioElement.play()
          this.isAudioPaused = false;
        } else {
          this.isAudioPaused = true;

          if (this.musicInterval)
            clearInterval(this.musicInterval);
        }
      }
    }, 1000);
  }

  pause(audioElement: HTMLAudioElement) {
    this.isAudioPaused = true;
    clearInterval(this.musicInterval)
    audioElement.pause();
  }

  setMusicTime() {
    this.audioElement!.nativeElement!.currentTime = this.currentTime;
  }

  nextSong() {
    clearInterval(this.musicInterval)
    this.currentTime = 0;
    this.isAudioPaused = true;
    this.musicInfo = this.musicPlayerService.getNextSong(this.musicId + 1);
    this.musicId++;
    this.getMusicFile(this.musicId)
  }

  prevSong() {
    clearInterval(this.musicInterval)
    this.currentTime = 0;
    this.isAudioPaused = true;
    this.musicInfo = this.musicPlayerService.getNextSong(this.musicId - 1);
    this.musicId--;
    this.getMusicFile(this.musicId)
  }

  addToLiked(music: Music) {
    this.musicService.addToLikedMusic(music.id,this.userID).subscribe({
      next: () => {
        this.isLikedMusic = true;
      },
      error: (err) => {
        this.isLikedMusic = false;
      }
    })
  }

  removeFromLiked(music: Music) {
    this.musicService.removeFromTheLikedMusic(music,this.userID).subscribe({
      next: () => {
        this.isLikedMusic = false;
      },
      error: (err) => {
        this.isLikedMusic = true;
      }
    })
  }

  checkIsLikedMusic(musicId: number) {
    this.isLikedMusic = !!this.likedMusic!.find((music) => music.id === musicId)
  }
}
