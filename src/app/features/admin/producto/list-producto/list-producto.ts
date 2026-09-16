import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FiltroProductos } from './filtro-producto/filtro-producto';
import { ProductosService } from '../../../admin/producto/producto.service';
import { Producto } from '../../../../core/models/producto.model';



@Component({
  selector: 'app-lista-producto',
  imports: [ButtonModule, TableModule, SkeletonModule, TagModule, FiltroProductos, RouterLink],
  templateUrl: './list-producto.html',
  styles: ``,
})
export class ListaProductos {
  private productosService = inject(ProductosService);
  private router = inject(Router);

  protected productos= signal<Producto[]>([]);

  ngOnInit(): void {
    this.obtenerProducto();
  }

  obtenerProducto():void {
    this.productosService.obtenerProducto().subscribe(
      (data) => {
        console.log(data);
        this.productos.set(data);
      }
    )
  }

  editarProductos(productos: Producto) {
    this.productosService.setProductoEditar(productos);
    this.router.navigate(['/admin/form-producto']);
  }

}