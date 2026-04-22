import { Component, OnInit, signal, inject, viewChild, ElementRef, AfterViewInit, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Europeana } from '../../servicios/europeana';
import { ArtworkCard } from '../../componentes/artwork-card/artwork-card';
import { Carousel } from '../../componentes/carousel/carousel';
import Masonry from 'masonry-layout'; 

@Component({
  selector: 'app-galeria',
  imports: [ArtworkCard, CommonModule, Carousel],
  templateUrl: './galeria.html',
  styleUrl: './galeria.css',
})
export class Galeria implements OnInit, AfterViewInit {
  private europeanaService = inject(Europeana);
  artworks = signal<any[]>([]);
  isLoading = signal(false);
  featuredArtworks = computed(() => this.artworks().slice(0, 5));

  // Masonry
  grillaElement = viewChild<ElementRef>('miGrilla'); 
  msnry?: Masonry;

  constructor() {
    effect(() => {
      this.artworks(); 
      this.recargarMasonry();
    });
  }

  ngOnInit() {
    this.cargarNuevasObras();

    window.onscroll = () => {
      if (this.isLoading()) return;

      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 600) {
        this.cargarMasObras();
      }
    };
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
  cargarNuevasObras() {
    this.isLoading.set(true);
    this.europeanaService.getArtworks().subscribe({
      next: (data) => {
        this.artworks.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  cargarMasObras() {
    this.isLoading.set(true);
    console.log('Cargando más obras...');

    this.europeanaService.getArtworks(undefined, true).subscribe({
      next: (nuevas) => {
        this.artworks.update((actuales) => [...actuales, ...nuevas]);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }
}