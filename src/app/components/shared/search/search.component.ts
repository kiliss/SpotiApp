import { SpotifyService } from 'src/app/services/spotify.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  artistas: any[] = [];

  constructor(private spotify: SpotifyService) {
  }

  buscar(termino: string) {
    termino.length > 0
      ? this.spotify.getArtistas(termino).subscribe((data: any) => {
          this.artistas = data;
        })
      : (this.artistas = []);
  }
}
