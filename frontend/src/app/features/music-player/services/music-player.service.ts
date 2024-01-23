import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {

  constructor(private http: HttpClient) {}

  getMusicFile(id: number): Observable<any> {
    return this.http.get(`${environment.base + 'music-catalog'}/${id}`, { responseType: 'blob' });
  }
}
