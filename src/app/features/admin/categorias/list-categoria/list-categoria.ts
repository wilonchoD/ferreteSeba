import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FiltroCategorias } from './filtro-categorias/filtro-categorias'; 

export interface Categoria {
  Nombre: string;
  Descripcion: string;
  Productos: number;
}

@Component({
  selector: 'app-lista-categorias',
  imports: [ButtonModule, TableModule, SkeletonModule, TagModule, RouterLink, FiltroCategorias],
  templateUrl: './list-categoria.html',
  styles: ``,
})
export class ListaCategorias {
  categorias: Categoria[] =
    [
      {
        "Nombre": "Procesador (CPU)",
        "Descripcion": "Unidad Central de Procesamiento (CPU)",
        "Productos": 12,
      },
      {
        "Nombre": "Almacenamiento",
        "Descripcion": "SSD, HDD y NVMe M.2",
        "Productos": 20,
      },
      {
        "Nombre": "Placa Madre (Motherboard)",
        "Descripcion": "ATX, Micro-ATX y Mini-ITX",
        "Productos": 8,
      },
      {
        "Nombre": "Memoria RAM",
        "Descripcion": "DDR4, DDR5 y SO-DIMM",
        "Productos": 15,
      },

    ];
}