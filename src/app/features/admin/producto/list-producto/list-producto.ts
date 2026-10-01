import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FiltroProductos } from './filtro-producto/filtro-producto';
import { ProductosService } from '../../../admin/producto/producto.service';
import { Producto } from '../../../../core/models/producto.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-lista-productos',
  imports: [ButtonModule, TableModule, SkeletonModule, TagModule, FiltroProductos],
  templateUrl: './list-producto.html',
  styles: ``,
})
export class ListaProductos {
  private productosService = inject(ProductosService);
  private router = inject(Router);


  private confirmationService = inject(ConfirmationService);
  private toastService = inject(MessageService);
  protected productos = signal<Producto[]>([]);

  ngOnInit(): void {
    this.obtenerProducto();
  }

  obtenerProducto(): void {
    this.productosService.obtenerProducto().subscribe(
      (data) => {
        console.log(data);
        this.productos.set(data);
      },
      () => {
        this.toastService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los productos.',
        });
      }
    )
  }

  editarProductos(productos: Producto) {
    this.productosService.setProductoEditar(productos);
    this.router.navigate(['/admin/form-producto']);
  }

  nuevoProducto() {
    this.productosService.setProductoEditar(null);
    this.router.navigate(['/admin/form-producto']);
  }

  eliminarProducto(producto_id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar el producto?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productosService.eliminarProducto(producto_id).subscribe(
          () => {
            this.obtenerProducto();
            this.toastService.add({ severity: 'success', summary: 'Producto eliminada' });
          },
          (err) => {
            this.toastService.add({
              severity: 'error',
              summary: 'Error al eliminar',
              detail: err.error?.message ?? 'No se pudo eliminar el producto.',
            });
          }
        )
      }
    });
  }
}