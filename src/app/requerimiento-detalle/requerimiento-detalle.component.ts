import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Requerimiento } from '../models/requerimiento';
import { RequerimientoService } from '../requerimiento.service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { HistorialModificacion } from '../models/historial-modificaciones';

@Component({
  selector: 'app-requerimiento-detalle',
  standalone: true,
  imports: [RouterLink, CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './requerimiento-detalle.component.html',
  styleUrls: ['./requerimiento-detalle.component.css']
})
export class RequerimientoDetalleComponent implements OnInit {
  requerimiento: Requerimiento | undefined;
  historial: HistorialModificacion[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private requerimientoService: RequerimientoService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.cargarRequerimiento(id);
      this.cargarHistorial(id);
    }
  }

  cargarRequerimiento(id: number): void {
    this.requerimientoService.obtenerRequerimiento(id).subscribe(
      requerimiento => this.requerimiento = requerimiento,
      error => console.error('Error al cargar requerimiento:', error)
    );
  }

  cargarHistorial(id: number): void {
    this.requerimientoService.obtenerHistorialRequerimiento(id).subscribe(
      historial => this.historial = historial,
      error => console.error('Error al cargar historial:', error)
    );
  }
}