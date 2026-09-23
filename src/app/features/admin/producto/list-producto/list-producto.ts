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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-lista-producto',
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
          (data) => {
            this.obtenerProducto();
            this.toastService.add({ severity: 'success', summary: 'Producto eliminada' });
          }
        )
      }
    });
  }
}