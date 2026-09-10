import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Categoria } from '../../../core/models/categoria.model';



@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private httpClient = inject(HttpClient);

  private apiURL = 'http://127.0.0.1:8000/api/categorias';

  private _categoria_editar = signal<Categoria | null>(null);
  categoriaEditar = this._categoria_editar.asReadonly();

  setCategoriaEditar(categoria: Categoria) {
    this._categoria_editar.set(categoria);
  }


  obtenerCategorias() {
    return this.httpClient.get<any>(this.apiURL);
  }

  guardarCategoria(categoria: Categoria) {
    return this.httpClient.post<any>(this.apiURL, categoria);
  }


}