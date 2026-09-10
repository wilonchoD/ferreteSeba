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
import { MarcasService } from '../marca.service';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-form-marcas',
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

  templateUrl: './form-marca.html',
  styles: ``
})
export class FormMarca {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private marcasService = inject(MarcasService);

  isEditMode = false;
  marcaId: string | null = null;

  showDebug: boolean = true;

  formMarca = this.fb.group({
    nombre: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10)]],
  });





  guardarMarca() {
    if (!this.formMarca.invalid) {
      const marca: any = this.formMarca.value;

      this.marcasService.guardarMarca(marca).subscribe(
        (data) => {
          alert('marca guardada con éxito');
          this.formMarca.reset();


        }
      )
    }
  }

}