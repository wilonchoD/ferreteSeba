import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FiltroMarcas } from './filtro-marca/filtro-marca';
import { MarcasService } from '../../../admin/marca/marca.service';
import { Marcas } from '../../../../core/models/marca.model';



@Component({
  selector: 'app-lista-marcas',
  imports: [ButtonModule, TableModule, SkeletonModule, TagModule, FiltroMarcas, RouterLink],
  templateUrl: './list-marca.html',
  styles: ``,
})
export class ListaMarcas {
  private marcasService = inject(MarcasService);
  private router = inject(Router);

  protected marcas= signal<Marcas[]>([]);

  ngOnInit(): void {
    this.obtenerMarcas();
  }

  obtenerMarcas():void {
    this.marcasService.obtenerMarcas().subscribe(
      (data) => {
        console.log(data);
        this.marcas.set(data);
      }
    )
  }

  editarMarcas(marcas: Marcas) {
    this.marcasService.setMarcaEditar(marcas);
    this.router.navigate(['/admin/form-marca']);
  }

}