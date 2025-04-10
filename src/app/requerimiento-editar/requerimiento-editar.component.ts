import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequerimientoService } from '../requerimiento.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Requerimiento } from '../models/requerimiento';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-requerimiento-editar',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './requerimiento-editar.component.html',
  styleUrls: ['./requerimiento-editar.component.css']
})
export class RequerimientoEditarComponent implements OnInit, OnDestroy {
  requerimientoForm: FormGroup;
  requerimientoId: number | null = null;
  requerimientoActual: Requerimiento | undefined;
  cantidadSubscription: Subscription | undefined;
  valorUnitarioSubscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private requerimientoService: RequerimientoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.requerimientoForm = this.fb.group({
      presupuesto: ['', Validators.required],
      unidad: ['', Validators.required],
      tipoBienServicio: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      valorUnitario: ['', [Validators.required, Validators.min(0)]],
      valorTotal: [{ value: 0, disabled: true }],
      fechaAdquisicion: ['', Validators.required],
      proveedor: ['', Validators.required],
      documentacion: [''],
    });
  }

  ngOnInit(): void {
    this.requerimientoId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.requerimientoId) {
      this.cargarRequerimiento();
    }

    this.cantidadSubscription = this.requerimientoForm.get('cantidad')?.valueChanges.subscribe(() => {
      this.calcularValorTotal();
    });

    this.valorUnitarioSubscription = this.requerimientoForm.get('valorUnitario')?.valueChanges.subscribe(() => {
      this.calcularValorTotal();
    });
  }

  ngOnDestroy(): void {
    if (this.cantidadSubscription) {
      this.cantidadSubscription.unsubscribe();
    }
    if (this.valorUnitarioSubscription) {
      this.valorUnitarioSubscription.unsubscribe();
    }
  }

  cargarRequerimiento(): void {
    this.requerimientoService.obtenerRequerimiento(this.requerimientoId!).subscribe(
      requerimiento => {
        this.requerimientoActual = requerimiento;
        if (requerimiento) {
          this.requerimientoForm.patchValue({
            presupuesto: requerimiento.presupuesto,
            unidad: requerimiento.unidad,
            tipoBienServicio: requerimiento.tipo_bien_servicio,
            cantidad: requerimiento.cantidad,
            valorUnitario: requerimiento.valor_unitario,
            fechaAdquisicion: requerimiento.fecha_adquisicion ? new Date(requerimiento.fecha_adquisicion) : null,
            proveedor: requerimiento.proveedor,
            documentacion: requerimiento.documentacion,
            valorTotal: requerimiento.valor_total
          });
          this.calcularValorTotal(); 
        }
      },
      error => console.error('Error al cargar requerimiento:', error)
    );
  }

  calcularValorTotal(): void {
    const cantidad = this.requerimientoForm.get('cantidad')?.value;
    const valorUnitario = this.requerimientoForm.get('valorUnitario')?.value;
    if (cantidad !== null && valorUnitario !== null) {
      this.requerimientoForm.patchValue({ valorTotal: cantidad * valorUnitario });
    } else {
      this.requerimientoForm.patchValue({ valorTotal: 0 });
    }
  }

  onSubmit(): void {
    if (this.requerimientoForm.valid && this.requerimientoId) {
      const requerimientoActualizado: Requerimiento = this.requerimientoForm.value;
      this.requerimientoService.actualizarRequerimiento(this.requerimientoId, requerimientoActualizado).subscribe(
        () => this.router.navigate(['/requerimientos']),
        error => console.error('Error al actualizar requerimiento:', error)
      );
    }
  }
}