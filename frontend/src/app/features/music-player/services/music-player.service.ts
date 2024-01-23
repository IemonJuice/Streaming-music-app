import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment.development";
import {Music} from "../../../core/models/music.model";

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {

  constructor(private http: HttpClient) {}

  getMusicFile(id: number): Observable<any> {
    return this.http.get(`${environment.base + 'music-catalog'}/${id}`, { responseType: 'blob' });
  }

  getNextSong(id:number) {
    return this.http.get<Music>(`${environment.base + 'music-catalog/info/'}${id}`);
  }
  getPreviousSong(id:number) {
    return this.http.get<Music>(`${environment.base + 'music-catalog/info/'}${id}`);
  }
}
