import { CommonModule } from '@angular/common';
import { Component, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { MenuPrincipal } from '../../../layout/menu-principal/menu-principal';

@Component({
  selector: 'app-detalle-obra',
  imports: [CommonModule, RouterLink, MenuPrincipal],
  templateUrl: './detalle-obra.html',
  styleUrl: './detalle-obra.css',
})
export class DetalleObra  {
  private router = inject(Router);
  obra = signal<any>(undefined);

  constructor() {
    const obraDesdeState = history.state?.['dataObra'];
    if (obraDesdeState) {
      this.obra.set(obraDesdeState);
    } else {
      this.router.navigate(['/inicio']);
    }
  }
}
