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

@Component({
  selector: 'app-form-marca',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Button,
    InputTextModule,
    RouterLink
  ],
  templateUrl: './form-marca.html',
  styles: ``
})
export class FormMarca implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEditMode = false;
  marcaId: string | null = null;

  showDebug = true;

  form = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]],
    description: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(150)
    ]]
  });

  ngOnInit(): void {
    this.marcaId =
      this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.marcaId;
    if (this.isEditMode) {
      // para la api
    }
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('Datos de la marca:', this.form.value);
    this.router.navigate(['/admin/lista-marcas']);
  }
}