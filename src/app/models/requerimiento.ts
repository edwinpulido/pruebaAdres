export interface Requerimiento {
    id?: number;
    presupuesto: number;
    unidad: string;
    tipo_bien_servicio: string;
    cantidad: number;
    valor_unitario: number;
    valor_total: number;
    fecha_adquisicion: Date | string;
    proveedor: string;
    documentacion: string;
    activo: number;
    historial?: Requerimiento[];
}
