export interface Producto {
    id?: number;
    categoria_id?: number;
    marca_id?: number;
    nombre?: string;
    codigo?: number;
    modelo?: string;
    color?: string;
    descripcion?: string;
    precio?: number;
    stock?: number;
    url_imagen?: string;
    estado?: 'Activo' | 'Inactivo'; 
}