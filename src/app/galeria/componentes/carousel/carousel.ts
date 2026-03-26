import { Component,Signal } from '@angular/core';
import { Input, computed} from '@angular/core';
@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel {
  @Input({ required: true }) artworks!: Signal<any[]>;
  limitArtworks = computed(() => {
    const list = this.artworks();
    return list.slice(0, 5);
  });
}
