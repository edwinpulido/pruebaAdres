import { Component, OnInit } from '@angular/core';
import { Requerimiento } from '../models/requerimiento';
import { RequerimientoService } from '../requerimiento.service';
import { RouterLink } from '@angular/router';
import { CommonModule} from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-requerimiento-lista',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatTableModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule       
  ],
  templateUrl: './requerimiento-lista.component.html',
  styleUrls: ['./requerimiento-lista.component.css'],
  providers: [RequerimientoService]
})
export class RequerimientoListaComponent implements OnInit {
  requerimientos: Requerimiento[] = [];
  displayedColumns: string[] = ['id', 'presupuesto', 'unidad', 'tipoBienServicio', 'cantidad', 'valorTotal', 'fechaAdquisicion', 'proveedor', 'documentacion','acciones']; 
  
  filtroPresupuesto: string = '';
  filtroUnidad: string = '';
  filtroTipoBienServicio: string = '';
  filtroFechaAdquisicion: string = '';
  filtroProveedor: string = '';

  constructor(private requerimientoService: RequerimientoService) { }

  ngOnInit(): void {
    this.cargarRequerimientos();
  }

  cargarRequerimientos(
    presupuesto: string = '',
    unidad: string = '',
    tipoBienServicio: string = '',
    fechaAdquisicion: string = '',
    proveedor: string = ''
    ): void {
    this.requerimientoService.listarRequerimientos(
      this.filtroPresupuesto,
      this.filtroUnidad,
      this.filtroTipoBienServicio,
      this.filtroFechaAdquisicion,
      this.filtroProveedor
    ).subscribe(
      requerimientos => this.requerimientos = requerimientos,
      error => console.error('Error al cargar requerimientos:', error)
    );
  }

  desactivarRequerimiento(id: number): void {
    if (confirm('¿Estás seguro de que deseas desactivar este requerimiento?')) {
      this.requerimientoService.desactivarRequerimiento(id).subscribe(
        () => {
          console.log(`Requerimiento con ID ${id} desactivado.`);
          this.cargarRequerimientos();
        },
        error => console.error('Error al desactivar requerimiento:', error)
      );
    }
  }

  aplicarFiltros(): void {
    this.cargarRequerimientos(
      this.filtroPresupuesto,
      this.filtroUnidad,
      this.filtroTipoBienServicio,
      this.filtroFechaAdquisicion,
      this.filtroProveedor
    );
  }

  limpiarFiltros(): void {
    this.filtroPresupuesto = '';
    this.filtroUnidad = '';
    this.filtroTipoBienServicio = '';
    this.filtroFechaAdquisicion = '';
    this.filtroProveedor = '';
    this.cargarRequerimientos(); // Carga todos los datos sin filtros
  }

}