import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {Music} from "../../core/models/music.model";



@Injectable({
  providedIn: 'root'
})
export class MusicService {

  private http: HttpClient = inject(HttpClient)

  upload(form: any, musicToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('file', musicToUpload)
    formData.append('name', form.name)
    formData.append('fileName', musicToUpload.name)
    formData.append('author', form.author)
    formData.append('genre', form.genre)
    formData.append('authorId', form.authorID)
    this.http.post(environment.base + 'music-catalog', formData).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  delete(id: number) {
    this.http.delete(environment.base + 'music-catalog' + '/' + `${id}`).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  async getLikedMusic(userID: number) {
    return this.http.get<Music[]>(environment.base + 'music-catalog' + '/' + 'liked' + '/' + userID)
  }

  addToLikedMusic(musicID: number,userID:number) {
    return this.http.post(environment.base + 'music-catalog' + '/' + 'liked', {musicId: musicID,userId:userID})
  }

  removeFromTheLikedMusic(music: Music, userID: number) {
    const removeRequestData = {
      musicId:music.id,
      userId:userID
    }
    return this.http.delete(environment.base + 'music-catalog/liked', {body:removeRequestData})
  }
}
