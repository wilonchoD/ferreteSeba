import { Component, inject, OnInit } from '@angular/core';
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
import { CategoriasService } from '../categorias.service';
import { SelectModule } from 'primeng/select';

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
    SelectModule,

  ],

  templateUrl: './form-categoria.html',
  styles: ``
})
export class FormCategoria {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private categoriaService = inject(CategoriasService);

  isEditMode = false;
  categoryId: string | null = null;

  showDebug: boolean = true;

  formCategoria = this.fb.group({
    nombre: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10)]],
    descripcion: ['', [
      Validators.minLength(3),
      Validators.maxLength(10)
    ]],
    categoria_id: [null]
  });

  categoriaPadreOptions = [
    
  ];




  guardarCategoria() {
    if (!this.formCategoria.invalid) {
      const categoria: any = this.formCategoria.value;

      this.categoriaService.guardarCategoria(categoria).subscribe(
        (data) => {
          alert('Categoría guardada con éxito');
          this.formCategoria.reset();


        }
      )
    }
  }
  // ngOnInit(): void {

  //   this.categoryId =
  //     this.route.snapshot.paramMap.get('id');

  //   this.isEditMode = !!this.categoryId;

  //   if (this.isEditMode) {



  //     this.categoriaService
  //       .obtenerCategoriaPorId(this.categoryId!)
  //       .subscribe(category => {
  //         this.formCategoria.patchValue(category);
  //       });

  //   }
  // }

}