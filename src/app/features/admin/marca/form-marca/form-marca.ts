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

@Component({
  selector: 'app-form-marca',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    Button,
    InputTextModule,
    TextareaModule,
    RouterLink
  ],

  templateUrl: './form-marca.html',
  styles: ``
})
export class FormMarca implements OnInit {

  isEditMode = false;

  brandId: string | null = null;

  form = {
    name: '',
    description: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.brandId =
      this.route.snapshot.paramMap.get('id');

    this.isEditMode = !!this.brandId;

    if (this.isEditMode) {

      // Después conectar con la API

      // this.brandService
      //   .getById(this.brandId!)
      //   .subscribe(brand => {
      //     this.form = brand;
      //   });

    }
  }

  onSave(): void {

    console.log('Marca:', this.form);

    if (this.isEditMode) {

      console.log(
        'Actualizando marca:',
        this.brandId
      );

    } else {

      console.log(
        'Creando marca:',
        this.form
      );

    }

    this.router.navigate([
      '/admin/lista-marcas'
    ]);
  }
}