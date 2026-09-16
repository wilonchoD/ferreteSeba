import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Producto } from '../../../core/models/producto.model';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private httpClient = inject(HttpClient);

  private apiURL = 'http://127.0.0.1:8000/api/productos';

  private _producto_editar = signal<Producto | null>(null);
  productoEditar = this._producto_editar.asReadonly();

  setProductoEditar(producto: Producto) {
    this._producto_editar.set(producto);
  }


  obtenerProducto() {
    return this.httpClient.get<any>(this.apiURL);
  }

  guardarProducto(producto: Producto) {
    return this.httpClient.post<any>(this.apiURL, producto);
  }


}