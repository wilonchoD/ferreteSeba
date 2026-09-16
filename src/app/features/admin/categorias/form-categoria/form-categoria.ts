import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CategoriasService } from '../categorias.service';
import { Categoria } from '../../../../core/models/categoria.model';
import { SelectModule } from 'primeng/select';
import { MessageService } from 'primeng/api';

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
  providers:[
    MessageService,
    
  ],

  templateUrl: './form-categoria.html',
  styles: ``
})
export class FormCategoria {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private categoriaService = inject(CategoriasService);
  private toastService = inject(MessageService);

  protected categoriasPadre = signal<Categoria[]>([]);


  showDebug: boolean = true;

  formCategoria = this.fb.group({
    nombre: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10)]],
    parent_id: [null as number | null]
  });





  ngOnInit() {
    this.obtenerCategoriasPadre();

    if (this.categoriaService.categoriaEditar() != null) {
      this.formCategoria.patchValue({
        nombre: this.categoriaService.categoriaEditar()?.nombre,
        parent_id: this.categoriaService.categoriaEditar()?.parent_id!
      })
    } else {
      this.formCategoria.reset();
    }
  }

  obtenerCategoriasPadre() {
    this.categoriaService.obtenerCategoriasParaParents().subscribe(
      (data) => {
        this.categoriasPadre.set(data);
      }
    )
  }

  guardarCategoria() {
    if (!this.formCategoria.invalid) {
      let categoria: Categoria = {
        nombre: this.formCategoria.value.nombre!,
        parent_id: this.formCategoria.value.parent_id ? Number(this.formCategoria.value.parent_id) : null
      }



      if (this.categoriaService.categoriaEditar() == null) {
        this.categoriaService.guardarCategoria(categoria).subscribe(
          (data) => {
            this.toastService.add({ severity: 'success', summary: data.message });
            this.finalizarGuardado();
          }
        )
      } else {

        this.categoriaService.actualizarCategoria(categoria, this.categoriaService.categoriaEditar()?.id!).subscribe(
          (data) => {
            this.toastService.add({ severity: 'success', summary: data.message });
            this.finalizarGuardado();
          }
        )
      }
    }
  }

  finalizarGuardado() {
    this.formCategoria.reset();
    this.router.navigate(['/admin/lista-categoria'])
  }

}