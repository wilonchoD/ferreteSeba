import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, RequiredValidator } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ProductosService } from '../producto.service';
import { CategoriasService } from '../../categorias/categorias.service';
import { MarcasService } from '../../marca/marca.service';
import { SelectModule } from 'primeng/select';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-form-productos',
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

  templateUrl: './form-producto.html',
  styles: ``
})
export class FormProducto {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productosService = inject(ProductosService);
  private categoriasService = inject(CategoriasService)
  private marcasService = inject(MarcasService)

  isEditMode = false;
  productoId: string | null = null;

  showDebug: boolean = true;

  formProducto = this.fb.group({
    nombre: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10)]],

    codigo: [null as number | null, [
      Validators.required
    ]],

    modelo: ['',[
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(15)
    ]],

    color: ['',[
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(10)
    ]],

    descripcion: ['', [
      Validators.minLength(3),
      Validators.maxLength(100)
    ]],

    precio: [null as number | null, [
      Validators.required,
    ]],

    stock: [null as number | null, [
      Validators.required
    ]],

    categoria_id: [null as number | null, [
      Validators.required
    ]],

    marca_id: [null as number | null, [
      Validators.required
    ]],

    url_imagen: [''],

    estado: ['', [
      Validators.required
    ]],



  });


  guardarProducto() {
    if (!this.formProducto.invalid) {
      const producto: any = this.formProducto.value;

      this.productosService.guardarProducto(producto).subscribe(
        (data) => {
          alert('producto guardado con éxito');
          this.formProducto.reset();


        }
      )
    }
  }

  categorias = []
  marcas = []

  cargarCategorias() {
    this.categoriasService.obtenerCategorias().subscribe(
      (categorias) => {
        this.categorias = categorias;
      }
    )
  }

  cargarMarcas() {
    this.marcasService.obtenerMarcas().subscribe(
      (marcas) => {
        this.marcas = marcas;
      }
    )
  }
  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarMarcas();
  }

}