import { Routes } from '@angular/router';
import { Galeria } from './galeria/paginas/galeria/galeria';
import { PaginaFav } from './favoritos/paginas/pagina-fav/pagina-fav';
import { DetalleObra } from './galeria/paginas/detalle-obra/detalle-obra';

export const routes: Routes = [
    
    {path:'inicio', component: Galeria},
    {path:'favoritos', component: PaginaFav},
    {path:'detalle-obra', component: DetalleObra},
    {path:'**', redirectTo:'inicio'}
];
