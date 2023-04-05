import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {
    console.log('Spotify service listo');
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQBeKdzlHLFCW6R_nNQvmnURVaYriB8gFcZJMmsY408hZP4FGS7eY-WB_ZbvtHex8JLaJM63vL8DwFyuVEdcfvXoMR8MuHqPRlg6ioCrvcCKdkpm-KJ0',
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20').pipe(
      map((data: any) => data['albums'].items)
    );
  }

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=20`).pipe(
      map((data: any) => data['artists'].items)
    );
  }
}
