import { Component, inject, OnInit, signal } from '@angular/core';
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
import { Categoria } from '../../../../core/models/categoria.model';
import { Marcas } from '../../../../core/models/marca.model';
import { Producto } from '../../../../core/models/producto.model';
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
  private categoriasService = inject(CategoriasService);
  private marcasService = inject(MarcasService);
  private toastService = inject(MessageService)



  protected categorias = signal<Categoria[]>([]);
  protected marcas = signal<Marcas[]>([]);


  showDebug: boolean = true;

  formProducto = this.fb.group({
    nombre: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10)]],

    codigo: [null as number | null, [
      Validators.required
    ]],

    modelo: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(15)
    ]],

    color: ['', [
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

    estado: [null as 'Activo' | 'Inactivo' | null, [
      Validators.required
    ]],



  });

  ngOnInit() {
    this.cargarCategorias();
    this.cargarMarcas();

    if (this.productosService.productoEditar() != null) {
      this.formProducto.patchValue({
        nombre: this.productosService.productoEditar()?.nombre,
        codigo: this.productosService.productoEditar()?.codigo,
        modelo: this.productosService.productoEditar()?.modelo,
        color: this.productosService.productoEditar()?.color,
        descripcion: this.productosService.productoEditar()?.descripcion,
        precio: this.productosService.productoEditar()?.precio,
        stock: this.productosService.productoEditar()?.stock,
        categoria_id: this.productosService.productoEditar()?.categoria_id,
        marca_id: this.productosService.productoEditar()?.marca_id,
        url_imagen: this.productosService.productoEditar()?.url_imagen,
        estado: this.productosService.productoEditar()?.estado,
      });
    } else {
      this.formProducto.reset();
    }
  }

  guardarProducto() {
    if (!this.formProducto.invalid) {
      const producto: Producto = {
        nombre: this.formProducto.value.nombre!,
        codigo: this.formProducto.value.codigo!,
        modelo: this.formProducto.value.modelo!,
        color: this.formProducto.value.color!,
        descripcion: this.formProducto.value.descripcion!,
        precio: this.formProducto.value.precio!,
        stock: this.formProducto.value.stock!,
        categoria_id: this.formProducto.value.categoria_id!,
        marca_id: this.formProducto.value.marca_id!,
        url_imagen: this.formProducto.value.url_imagen!,
        estado: this.formProducto.value.estado!,
      };
      if (this.productosService.productoEditar() == null) {
        this.productosService.guardarProducto(producto).subscribe(
          (data) => {
            this.toastService.add({ severity: 'success', summary: data.message });
            this.finalizarGuardado();
          }
        );
      } else {
        this.productosService.actualizarProducto(producto, this.productosService.productoEditar()?.id!).subscribe(
          (data) => {
            this.toastService.add({ severity: 'success', summary: data.message });
            this.finalizarGuardado();
          }
        );
      }
    }
  }


  cargarCategorias() {
    this.categoriasService.obtenerCategorias().subscribe(
      (categorias) => {
        this.categorias.set(categorias);
      }
    )
  }

  cargarMarcas() {
    this.marcasService.obtenerMarcas().subscribe(
      (marcas) => {
        this.marcas.set(marcas);
      }
    )
  }

  finalizarGuardado() {
    this.formProducto.reset();
    this.router.navigate(['/admin/lista-producto']);
  }
}