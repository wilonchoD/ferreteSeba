import { Routes } from '@angular/router';

import { ListaCategorias } from './categorias/list-categoria/list-categoria';
import { FormCategoria } from './categorias/form-categoria/form-categoria';

import { ListaProductos } from './producto/list-producto/list-producto';
import { FormProducto } from './producto/form-producto/form-producto';

import { ListaMarcas } from './marca/list-marca/list-marca';
import { FormMarca } from './marca/form-marca/form-marca';

export const adminRoutes: Routes = [


  {
    path: 'lista-categorias',
    component: ListaCategorias,
    title: 'Categorías'
  },

  {
    path: 'form-categoria',
    component: FormCategoria,
    title: 'Nueva Categoría'
  },

  {
    path: 'form-categoria/:id',
    component: FormCategoria,
    title: 'Editar Categoría'
  },

  {
    path: 'lista-productos',
    component: ListaProductos,
    title: 'Productos'
  },

  {
    path: 'form-producto',
    component: FormProducto,
    title: 'Nuevo Producto'
  },

  {
    path: 'form-producto/:id',
    component: FormProducto,
    title: 'Editar Producto'
  },

  {
    path: 'lista-marcas',
    component: ListaMarcas,
    title: 'Marcas'
  },

  {
    path: 'form-marca',
    component: FormMarca,
    title: 'Nueva Marca'
  },

  {
    path: 'form-marca/:id',
    component: FormMarca,
    title: 'Editar Marca'
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'lista-categorias'
  },

  {
    path: '**',
    redirectTo: 'lista-categorias'
  }

];