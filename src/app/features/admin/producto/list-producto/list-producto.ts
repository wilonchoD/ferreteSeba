import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
}

@Component({
  selector: 'app-lista-productos',
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

  templateUrl: './list-producto.html',
  styles: ``
})
export class ListaProductos implements OnInit {

  products: Product[] = [];

  filteredProducts: Product[] = [];

  searchTerm = '';

  ngOnInit(): void {

    this.products = [

      {
        id: 1,
        name: 'Taladro Percutor',
        brand: 'Bosch',
        category: 'Herramientas',
        price: 125000,
        stock: 10
      },

      {
        id: 2,
        name: 'Amoladora Angular',
        brand: 'Dewalt',
        category: 'Herramientas',
        price: 98000,
        stock: 5
      },

      {
        id: 3,
        name: 'Sierra Circular',
        brand: 'Bosch',
        category: 'Herramientas',
        price: 180000,
        stock: 0
      }

    ];

    this.filteredProducts = [
      ...this.products
    ];
  }

  filterProducts(): void {

    const search =
      this.searchTerm.toLowerCase().trim();

    if (!search) {

      this.filteredProducts = [
        ...this.products
      ];

      return;
    }

    this.filteredProducts =
      this.products.filter(product =>

        product.name
          .toLowerCase()
          .includes(search)

        ||

        product.brand
          .toLowerCase()
          .includes(search)

        ||

        product.category
          .toLowerCase()
          .includes(search)

      );
  }

  deleteProduct(id: number): void {

    const confirmed = confirm(
      '¿Estás seguro de que deseas eliminar este producto?'
    );

    if (!confirmed) {
      return;
    }

    this.products =
      this.products.filter(
        product => product.id !== id
      );

    this.filterProducts();
  }
}