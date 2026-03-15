import { Component,OnInit, signal, inject } from '@angular/core';
import { Europeana } from '../../servicios/europeana';
import { ArtworkCard } from '../../componentes/artwork-card/artwork-card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-galeria',
  imports: [ArtworkCard,CommonModule],
  templateUrl: './galeria.html',
  styleUrl: './galeria.css',
})
export class Galeria{
  // En tu componente de la carpeta paginas
artworks = signal<any[]>([]); // Usando Signals de Angular 17
galeriaService = inject(Europeana);

ngOnInit() {
  this.galeriaService.getArtworks().subscribe(data => {
    this.artworks.set(data);
  });
}

  
  
}
