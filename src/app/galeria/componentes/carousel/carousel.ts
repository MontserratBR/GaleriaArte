import { Component,Signal } from '@angular/core';
import { Input, computed} from '@angular/core';
@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel {
// Recibimos la señal de la galería
  @Input({ required: true }) artworks!: Signal<any[]>;

  
  limitArtworks = computed(() => {
    const list = this.artworks();
    return list.slice(0, 5);
  });
}
