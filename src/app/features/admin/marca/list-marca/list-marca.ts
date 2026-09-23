import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FiltroMarcas } from './filtro-marca/filtro-marca';
import { MarcasService } from '../../../admin/marca/marca.service';
import { Marcas } from '../../../../core/models/marca.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-lista-marcas',
  imports: [ButtonModule, TableModule, SkeletonModule, TagModule, FiltroMarcas],
  templateUrl: './list-marca.html',
  styles: ``,
})
export class ListaMarcas {
  private marcasService = inject(MarcasService);
  private router = inject(Router);

  private confirmationService = inject(ConfirmationService);
  private toastService = inject(MessageService);

  protected marcas = signal<Marcas[]>([]);

  ngOnInit(): void {
    this.obtenerMarcas();
  }

  obtenerMarcas(): void {
    this.marcasService.obtenerMarcas().subscribe(
      (data) => {
        console.log(data);
        this.marcas.set(data);
      }
    )
  }

  editarMarca(marcas: Marcas) {
    this.marcasService.setMarcaEditar(marcas);
    this.router.navigate(['/admin/form-marca']);
  }

  nuevaMarca() {
    this.marcasService.setMarcaEditar(null);
    this.router.navigate(['/admin/form-marca']);
  }

  eliminarMarca(marca_id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar la marca?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.marcasService.eliminarMarca(marca_id).subscribe(
          (data) => {
            this.obtenerMarcas();
            this.toastService.add({ severity: 'success', summary: 'Marca eliminada' });
          }
        )
      }
    });
  }
}