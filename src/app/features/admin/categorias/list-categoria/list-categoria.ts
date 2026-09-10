import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FiltroCategorias } from './filtro-categorias/filtro-categorias';
import { CategoriasService } from '../categorias.service';
import { Categoria } from '../../../../core/models/categoria.model';



@Component({
  selector: 'app-lista-categorias',
  imports: [ButtonModule, TableModule, SkeletonModule, TagModule, FiltroCategorias, RouterLink],
  templateUrl: './list-categoria.html',
  styles: ``,
})
export class ListaCategorias {
  private categoriasService = inject(CategoriasService);
  private router = inject(Router);

  protected categorias= signal<Categoria[]>([]);

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias():void {
    this.categoriasService.obtenerCategorias().subscribe(
      (data) => {
        console.log(data);
        this.categorias.set(data);
      }
    )
  }

  editarCategoria(categoria: Categoria) {
    this.categoriasService.setCategoriaEditar(categoria);
    this.router.navigate(['/admin/form-categoria']);
  }

}