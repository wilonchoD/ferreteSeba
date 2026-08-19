import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { Select } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';

interface Brand {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-form-producto',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    Button,
    InputTextModule,
    TextareaModule,
    Select,
    InputNumberModule,
    RouterLink
  ],

  templateUrl: './form-producto.html',
  styles: ``
})
export class FormProducto implements OnInit {

  isEditMode = false;

  productId: string | null = null;

  form = {

    name: '',

    description: '',

    price: 0,

    stock: 0,

    brandId: null as number | null,

    categoryId: null as number | null

  };

  brands: Brand[] = [

    {
      id: 1,
      name: 'Bosch'
    },

    {
      id: 2,
      name: 'Dewalt'
    },

    {
      id: 3,
      name: 'Makita'
    }

  ];

  categories: Category[] = [

    {
      id: 1,
      name: 'Herramientas'
    },

    {
      id: 2,
      name: 'Electricidad'
    },

    {
      id: 3,
      name: 'Construcción'
    }

  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.productId =
      this.route.snapshot.paramMap.get('id');

    this.isEditMode =
      !!this.productId;

    if (this.isEditMode) {

      // Después conectamos con Laravel.

      // this.productService
      //   .getById(this.productId!)
      //   .subscribe(product => {
      //
      //     this.form = product;
      //
      //   });

    }
  }

  onSave(): void {

    console.log(
      'Datos del producto:',
      this.form
    );

    if (this.isEditMode) {

      console.log(
        'Actualizando producto:',
        this.productId
      );

    } else {

      console.log(
        'Creando producto:',
        this.form
      );

    }

    this.router.navigate([
      '/admin/lista-productos'
    ]);
  }
}