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
import { Marcas } from '../../../../core/models/marca.model';
import { SelectModule } from 'primeng/select';
import { MessageService } from 'primeng/api';

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
  providers: [
    MessageService,
  ],

  templateUrl: './form-marca.html',
  styles: ``
})
export class FormMarca {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private marcasService = inject(MarcasService);
  private toastService = inject(MessageService);


  showDebug: boolean = true;

  formMarca = this.fb.group({
    nombre: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10)]],
  });

  ngOnInit() {
    if (this.marcasService.marcaEditar() != null) {
      this.formMarca.patchValue({
        nombre: this.marcasService.marcaEditar()?.nombre,
      })
    } else {
      this.formMarca.reset();
    }
  }

  guardarMarca() {
    if (!this.formMarca.invalid) {
      let marca: Marcas = {
        nombre: this.formMarca.value.nombre!,
      }



      if (this.marcasService.marcaEditar() == null) {
        this.marcasService.guardarMarca(marca).subscribe(
          (data) => {
            this.toastService.add({ severity: 'success', summary: data.message });
            this.finalizarGuardado();
          }
        )
      } else {

        this.marcasService.actualizarMarca(marca, this.marcasService.marcaEditar()?.id!).subscribe(
          (data) => {
            this.toastService.add({ severity: 'success', summary: data.message });
            this.finalizarGuardado();
          }
        )
      }
    }
  }
  finalizarGuardado() {
    this.formMarca.reset();
    this.router.navigate(['/admin/lista-marcas'])
  }
}
