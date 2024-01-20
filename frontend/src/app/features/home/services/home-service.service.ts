import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment.development";
import {Music} from "../../../core/models/music.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  http: HttpClient = inject(HttpClient);

  constructor() {}

  getAllMusic(): Observable<Music[]> {
    return this.http.get<Music[]>(environment.base + 'music-catalog')
  }

  getFilteredMusic(genre:string):Observable<Music[]> {
    return this.http.get<Music[]>(environment.base + 'music-catalog/' +'genres/' + genre)
  }

  getSearchingMusic(info:string) {
    if(info === ''){
      return this.getAllMusic()
    }
    return this.http.get<Music[]>(environment.base + 'music-catalog/' + 'search/' + info)
  }
}
