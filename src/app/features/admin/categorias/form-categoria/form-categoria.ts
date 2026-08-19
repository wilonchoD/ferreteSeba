import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-form-categoria',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Button,
    InputTextModule,
    TextareaModule,
    RouterLink,

  ],

  templateUrl: './form-categoria.html',
  styles: ``
})
export class FormCategoria {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEditMode = false;
  categoryId: string | null = null;

  showDebug: boolean = true;

  form = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(3), 
      Validators.maxLength(10)]],
    description: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10)
    ]],
    // parentCategoryId: [null]
  });

  // Temporalmente usamos datos de prueba.
  // Después los reemplazamos por los datos de la API.
  // parentCategories = [
  //   {
  //     id: 1,
  //     name: 'Living Room'
  //   },
  //   {
  //     id: 2,
  //     name: 'Comedor'
  //   },
  //   {
  //     id: 3,
  //     name: 'Dormitorio'
  //   }
  // ];


  ngOnInit(): void {

    this.categoryId =
      this.route.snapshot.paramMap.get('id');

    this.isEditMode = !!this.categoryId;

    if (this.isEditMode) {

      // Después conectamos esto con tu API.
      //
      // this.categoryService
      //   .getById(this.categoryId!)
      //   .subscribe(category => {
      //     this.form = category;
      //   });

    }
  }

  onSave(): void {

  this.router.navigate(['/admin/list-categorias']);
  }
}