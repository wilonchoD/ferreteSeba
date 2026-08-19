import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

interface Brand {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-lista-marcas',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    Button,
    TableModule,
    InputTextModule,
    TooltipModule
  ],

  templateUrl: './list-marca.html',
  styles: ``
})
export class ListaMarcas implements OnInit {

  brands: Brand[] = [];

  filteredBrands: Brand[] = [];

  searchTerm = '';

  ngOnInit(): void {

    this.brands = [
      {
        id: 1,
        name: 'Bosch',
        description: 'Herramientas eléctricas y accesorios'
      },
      {
        id: 2,
        name: 'Dewalt',
        description: 'Herramientas profesionales'
      },
      {
        id: 3,
        name: 'Makita',
        description: 'Herramientas eléctricas'
      }
    ];

    this.filteredBrands = [...this.brands];
  }

  filterBrands(): void {

    const search = this.searchTerm
      .toLowerCase()
      .trim();

    if (!search) {
      this.filteredBrands = [...this.brands];
      return;
    }

    this.filteredBrands = this.brands.filter(brand =>
      brand.name.toLowerCase().includes(search) ||
      brand.description.toLowerCase().includes(search)
    );
  }

  deleteBrand(id: number): void {

    const confirmed = confirm(
      '¿Estás seguro de que deseas eliminar esta marca?'
    );

    if (!confirmed) {
      return;
    }

    this.brands = this.brands.filter(
      brand => brand.id !== id
    );

    this.filterBrands();
  }
}