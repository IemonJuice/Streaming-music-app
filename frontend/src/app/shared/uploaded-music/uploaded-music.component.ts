import {Component, inject, OnInit} from '@angular/core';
import {Profile} from "../../core/models/profile.model";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UploadService} from "../upload/upload.service";

@Component({
  selector: 'app-uploaded-music',
  templateUrl: './uploaded-music.component.html',
  styleUrl: './uploaded-music.component.scss',
  animations: [
    trigger('fromBottomToTop', [
      state('void', style({
        transform: 'translateY(100%)'
      })),
      transition('void <=> *', animate(300)),
    ]),
  ]
})
export class UploadedMusicComponent implements OnInit {
  private store: Store<{ userProfile: Profile }> = inject(Store<{ userProfile: Profile }>)
  profile!: Observable<Profile>
  private uploadService: UploadService = inject(UploadService);
  isUploadingModalVisible: boolean = false;
  musicToUpload!: File;
  form: FormGroup = inject(FormBuilder).group({
    name: [''],
    file: [null, [Validators.required]],
    author: ['', [Validators.required]],
    genre: ['', [Validators.required]],
    authorID: [[Validators.required]]
  });

  ngOnInit(): void {
    this.profile = this.store.select('userProfile')
    this.store.select('userProfile').subscribe(profile => {
      this.form.get('authorID')?.setValue(profile.id);
    })
  }

  uploadMusic() {
    this.uploadService.upload(this.form.getRawValue(), this.musicToUpload)
  }

  onFileChange(event: any) {
    const files = event.target.files;
    this.musicToUpload = files[0];
  }

  deleteFile(id: number) {
    this.uploadService.delete(id);
  }
}
