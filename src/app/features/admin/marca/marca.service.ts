import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Marcas } from '../../../core/models/marca.model';

@Injectable({
  providedIn: 'root',
})
export class MarcasService {
  private httpClient = inject(HttpClient);

  private apiURL = 'http://127.0.0.1:8000/api/marcas';

  private _marca_editar = signal<Marcas | null>(null);
  marcaEditar = this._marca_editar.asReadonly();

  setMarcaEditar(marca: Marcas) {
    this._marca_editar.set(marca);
  }


  obtenerMarcas() {
    return this.httpClient.get<any>(this.apiURL);
  }

  guardarMarca(marca: Marcas) {
    return this.httpClient.post<any>(this.apiURL, marca);
  }


}