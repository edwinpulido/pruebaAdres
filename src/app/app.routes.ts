import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequerimientoListaComponent } from './requerimiento-lista/requerimiento-lista.component';
import { RequerimientoDetalleComponent } from './requerimiento-detalle/requerimiento-detalle.component';
import { RequerimientoCrearComponent } from './requerimiento-crear/requerimiento-crear.component';
import { RequerimientoEditarComponent } from './requerimiento-editar/requerimiento-editar.component';

export const routes: Routes = [
  { path: 'requerimientos', component: RequerimientoListaComponent },
  { path: 'requerimientos/crear', component: RequerimientoCrearComponent },
  { path: 'requerimientos/:id', component: RequerimientoDetalleComponent },
  { path: 'requerimientos/editar/:id', component: RequerimientoEditarComponent },
  { path: '', redirectTo: '/requerimientos', pathMatch: 'full' },
];