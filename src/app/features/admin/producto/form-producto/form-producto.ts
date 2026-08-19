import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-form-producto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEditMode = false;
  productoId: string | null = null;
  showDebug = true;

  form = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]],
    description: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(500)
    ]],
    price: [0, [
      Validators.required,
      Validators.min(0)
    ]],
    stock: [0, [
      Validators.required,
      Validators.min(0)
    ]],

    categoriaId: [null, [
      Validators.required
    ]],

    marcaId: [null, [
      Validators.required
    ]]

  });


  // Datos temporales.
  // Después los reemplazamos por la API.

  categorias = [
    {
      id: 1,
      name: 'Herramientas'
    },
    {
      id: 2,
      name: 'Materiales eléctricos'
    },
    {
      id: 3,
      name: 'Plomería'
    }
  ];


  marcas = [
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


  ngOnInit(): void {

    this.productoId =
      this.route.snapshot.paramMap.get('id');

    this.isEditMode = !!this.productoId;

    if (this.isEditMode) {

      // Después conectamos esto con tu API.

    }
  }


  onSave(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    console.log(
      'Datos del producto:',
      this.form.value
    );

    this.router.navigate(['/admin/lista-productos']);
  }

}