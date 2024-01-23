import {AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {CurrentMusic} from "../../../store/reducers/reducers";
import {Store} from "@ngrx/store";
import {Music} from "../../../core/models/music.model";
import {Observable} from "rxjs";
import {MusicPlayerService} from "../services/music-player.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.scss'
})
export class MusicPlayerComponent implements OnInit, AfterViewInit {
  audioSrc: SafeUrl | undefined;
  musicInterval: any;
  isAudioPaused: boolean = true;
  @ViewChild('audioElement', {static: false}) audioElement?: ElementRef
  store: Store<{ currentPlayingMusic: CurrentMusic }> = inject(Store<{ currentPlayingMusic: CurrentMusic }>);
  musicInfo!: Observable<Music>
  musicLength: number = 0;
  currentTime: any = 0;
  musicPlayerService: MusicPlayerService = inject(MusicPlayerService)
  sanitizer:DomSanitizer = inject(DomSanitizer)

  ngOnInit() {
    this.musicInfo = this.store.select('currentPlayingMusic')
    this.musicInfo.subscribe(music => {
        this.getMusicFile(music.id)
    })

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

    if (this.currentTime === this.musicLength) {
      this.currentTime = 0;
      this.isAudioPaused = true;
      clearInterval(this.musicInterval);
    }

    this.musicInterval = setInterval(() => {

      this.currentTime = this.currentTime + 1;

      if (this.currentTime === this.musicLength) {
        this.currentTime = 0;
        this.isAudioPaused = true;
        clearInterval(this.musicInterval);

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
}
