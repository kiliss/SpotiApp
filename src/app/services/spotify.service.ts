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
        'Bearer BQAttWype08iLxD7djeyIY5h4K0-ICx6pQ1H8MzyUxjhRrxEOXbDRKq2GXPITwvmr2DbRe-S1LnCHnieXeK9UqGto0fKTReyLiejQ6lDlAQYo-Ka9xLE',
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
  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
  }
  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map((data: any) => data['tracks'])
    );
  }
}
