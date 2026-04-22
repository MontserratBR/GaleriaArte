import { Component,AfterViewInit, viewChild, ElementRef, effect } from '@angular/core';
import { inject } from '@angular/core';
import { Favoritos } from '../../servicios/favoritos';
import { ArtworkCard } from '../../../galeria/componentes/artwork-card/artwork-card';
import Masonry from 'masonry-layout';

@Component({
  selector: 'app-pagina-fav',
  imports: [ArtworkCard],
  templateUrl: './pagina-fav.html',
  styleUrl: './pagina-fav.css',
})
export class PaginaFav implements AfterViewInit{
  public favService = inject(Favoritos);

  grillaElement = viewChild<ElementRef>('miGrilla');
  msnry?: Masonry;

  constructor() {
    effect(() => {
      this.favService.favoritos(); 
      this.recargarMasonry();
    });
  }

  ngAfterViewInit() {
    this.inicializarMasonry();
  }

  inicializarMasonry() {
    const elemento = this.grillaElement()?.nativeElement;
    if (elemento) {
      this.msnry = new Masonry(elemento, {
        itemSelector: '.col',
        percentPosition: true,
      });
    }
  }

  recargarMasonry() {
    const msnryInstance = this.msnry;

    if (msnryInstance) {
      setTimeout(() => {
        msnryInstance!.reloadItems?.();
        msnryInstance!.layout?.();
      }, 200); 
    }
  }

}
