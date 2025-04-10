import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequerimientoService } from '../requerimiento.service';
import { Router, RouterLink } from '@angular/router';
import { Requerimiento } from '../models/requerimiento';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-requerimiento-crear',
  standalone: true,
  imports: [
    RouterLink, 
    CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './requerimiento-crear.component.html',
  styleUrls: ['./requerimiento-crear.component.css']
})
export class RequerimientoCrearComponent {
  requerimientoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private requerimientoService: RequerimientoService,
    private router: Router
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

  calcularValorTotal(): void {
    const cantidad = this.requerimientoForm.get('cantidad')?.value;
    const valorUnitario = this.requerimientoForm.get('valorUnitario')?.value;
    const valorTotal = cantidad * valorUnitario;
    this.requerimientoForm.patchValue({ valorTotal: valorTotal });
  }

  onSubmit(): void {
    if (this.requerimientoForm.valid) {
      const nuevoRequerimiento: Requerimiento = this.requerimientoForm.value;
      this.requerimientoService.crearRequerimiento(nuevoRequerimiento).subscribe(
        () => this.router.navigate(['/requerimientos']),
        error => console.error('Error al crear requerimiento:', error)
      );
    }
  }
}