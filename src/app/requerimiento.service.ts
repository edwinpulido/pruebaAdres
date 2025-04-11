import { Injectable } from '@angular/core';
import { Requerimiento } from './models/requerimiento';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HistorialModificacion } from './models/historial-modificaciones';



@Injectable({
  providedIn: 'root'
})
export class RequerimientoService {
  private apiUrl = 'http://127.0.0.1:5000/requerimientos'; 
  private requerimientos: Requerimiento[] = []; 
  private historial: HistorialModificacion[] = [];

  constructor(private http: HttpClient) {}

  listarRequerimientos(
    presupuesto?: string,
    unidad?: string,
    tipoBienServicio?: string,
    fechaAdquisicion?: string,
    proveedor?: string
  ): Observable<Requerimiento[]> {
    let params = new HttpParams();
    if (presupuesto) {
      params = params.set('presupuesto', presupuesto);
    }
    if (unidad) {
      params = params.set('unidad', unidad);
    }
    if (tipoBienServicio) {
      params = params.set('tipo_bien_servicio', tipoBienServicio);
    }
    if (fechaAdquisicion) {
      params = params.set('fecha_adquisicion', fechaAdquisicion);
    }
    if (proveedor) {
      params = params.set('proveedor', proveedor);
    }
    return this.http.get<Requerimiento[]>(this.apiUrl, { params });
  }

  obtenerRequerimiento(id: number): Observable<Requerimiento | undefined> {
    return this.http.get<Requerimiento>(`${this.apiUrl}/${id}`); 
  }

  crearRequerimiento(requerimiento: Requerimiento): Observable<Requerimiento> {
    requerimiento.id = this.requerimientos.length + 1; 
    requerimiento.activo = 1;
    requerimiento.historial = [];
    requerimiento.valor_total = requerimiento.cantidad * requerimiento.valor_unitario;

    this.requerimientos.push(requerimiento);
    return this.http.post<Requerimiento>(this.apiUrl, requerimiento); 
  }

  actualizarRequerimiento(id: number, requerimiento: Requerimiento): Observable<Requerimiento | undefined> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Requerimiento>(url, requerimiento); 
  }

  desactivarRequerimiento(id: number): Observable<any> { 
    return this.http.put(`${this.apiUrl}/desactivar/${id}`, {});
  }

  obtenerHistorialRequerimiento(id: number): Observable<HistorialModificacion[]> {
    return this.http.get<HistorialModificacion[]>(`${this.apiUrl}/${id}/historial`);
  }
}