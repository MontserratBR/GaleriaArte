import { Component,OnInit, signal, inject } from '@angular/core';
import { Europeana } from '../../servicios/europeana';
import { ArtworkCard } from '../../componentes/artwork-card/artwork-card';
import { CommonModule } from '@angular/common';
import { computed } from '@angular/core';
import { Carousel } from '../../componentes/carousel/carousel';
import { MenuPrincipal } from "../../../layout/menu-principal/menu-principal";
@Component({
  selector: 'app-galeria',
  imports: [ArtworkCard, CommonModule, Carousel, MenuPrincipal],
  templateUrl: './galeria.html',
  styleUrl: './galeria.css',
})
export class Galeria implements OnInit {
 private europeanaService = inject(Europeana);
  
  artworks = signal<any[]>([]);
  isLoading = signal(false); // Candado para evitar peticiones duplicadas
  featuredArtworks = computed(() => this.artworks().slice(0, 5));

  ngOnInit() {
    this.cargarNuevasObras();
    
    // Escuchamos el scroll de forma segura
    window.onscroll = () => {
      // Si ya está cargando, no hacemos nada
      if (this.isLoading()) return;

      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 600) {
        this.cargarMasObras();
      }
    };
  }

  cargarNuevasObras() {
    this.isLoading.set(true);
    this.europeanaService.getArtworks().subscribe({
      next: (data) => {
        this.artworks.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  cargarMasObras() {
    this.isLoading.set(true);
    console.log('Cargando más obras...');
    
    this.europeanaService.getArtworks(undefined, true).subscribe({
      next: (nuevas) => {
        // Evitamos duplicados comparando IDs si fuera necesario
        this.artworks.update(actuales => [...actuales, ...nuevas]);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }
}
