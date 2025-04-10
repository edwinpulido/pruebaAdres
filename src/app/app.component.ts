import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RequerimientoListaComponent } from './requerimiento-lista/requerimiento-lista.component';
import { CommonModule } from '@angular/common';
import { RequerimientoCrearComponent } from './requerimiento-crear/requerimiento-crear.component';
import { RequerimientoDetalleComponent } from './requerimiento-detalle/requerimiento-detalle.component';
import { RequerimientoEditarComponent } from './requerimiento-editar/requerimiento-editar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'admin_adres';
}
