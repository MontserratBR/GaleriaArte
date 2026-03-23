import { Component, OnInit, signal, inject, viewChild, ElementRef, AfterViewInit, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Europeana } from '../../servicios/europeana';
import { ArtworkCard } from '../../componentes/artwork-card/artwork-card';
import { Carousel } from '../../componentes/carousel/carousel';
import { MenuPrincipal } from "../../../layout/menu-principal/menu-principal";
import Masonry from 'masonry-layout'; // <-- 1. Importamos Masonry

@Component({
  selector: 'app-galeria',
  imports: [ArtworkCard, CommonModule, Carousel, MenuPrincipal],
  templateUrl: './galeria.html',
  styleUrl: './galeria.css',
})
export class Galeria implements OnInit, AfterViewInit {
  private europeanaService = inject(Europeana);

  // Signals
  artworks = signal<any[]>([]);
  isLoading = signal(false);
  featuredArtworks = computed(() => this.artworks().slice(0, 5));

  // Referencias y Variables para Masonry
  grillaElement = viewChild<ElementRef>('miGrilla'); // <-- 2. Atrapamos el elemento del HTML
  msnry?: Masonry;

  constructor() {
    // <-- 3. Cada vez que 'artworks' cambie (carga inicial o infinite scroll), reacomodamos Masonry
    effect(() => {
      this.artworks(); // Leemos el signal para registrar la dependencia del efecto
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

  // <-- 4. Una vez la vista se renderiza por primera vez, creamos la instancia de Masonry
  ngAfterViewInit() {
    this.inicializarMasonry();
  }

  inicializarMasonry() {
    const elemento = this.grillaElement()?.nativeElement;
    if (elemento) {
      this.msnry = new Masonry(elemento, {
        itemSelector: '.col', // Selector de las columnas de bootstrap
        percentPosition: true,
      });
    }
  }

  recargarMasonry() {
  const msnryInstance = this.msnry;

  if (msnryInstance) {
    setTimeout(() => {
      // 3. TypeScript ya no se quejará porque 'msnryInstance' es de lectura fija aquí
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