import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private http:HttpClient = inject(HttpClient)

  upload(form: any, musicToUpload: File) {
    const formData:FormData = new FormData();
    formData.append('file',musicToUpload)
    formData.append('name',form.name)
    formData.append('fileName',musicToUpload.name)
    formData.append('author',form.author)
    formData.append('genre',form.genre)
    formData.append('authorId',form.authorID)
    this.http.post(environment.base+'music-catalog',formData).subscribe({
      next:(response) => {
        console.log(response)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  delete(id:number) {
    this.http.delete(environment.base + 'music-catalog' + '/' + `${id}`).subscribe({
      next:(response) => {
        console.log(response)
      },
      error:(err) => {
        console.log(err)
      }
    })
  }
}
