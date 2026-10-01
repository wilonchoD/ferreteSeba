import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { CategoriasService } from '../categorias/categorias.service';
import { MarcasService } from '../marca/marca.service';
import { ProductosService } from '../producto/producto.service';

@Component({
    selector: 'app-dashboard-admin',
    imports: [RouterLink, CardModule, SkeletonModule],
    templateUrl: './dashboard-admin.html',
    styles: ``,
})
export class DashboardAdmin {
    private categoriasService = inject(CategoriasService);
    private marcasService = inject(MarcasService);
    private productosService = inject(ProductosService);

    protected totalCategorias = signal(0);
    protected totalMarcas = signal(0);
    protected totalProductos = signal(0);
    protected cargandoCategorias = signal(true);
    protected cargandoMarcas = signal(true);
    protected cargandoProductos = signal(true);

    protected error = signal(false);

    ngOnInit(): void {
        this.cargarTotales();
    }

    cargarTotales(): void {
        this.error.set(false);

        this.categoriasService.obtenerCategorias().subscribe({
            next: (data) => {
                this.totalCategorias.set(data.length);
                this.cargandoCategorias.set(false);
            },
            error: () => {
                this.error.set(true);
                this.cargandoCategorias.set(false);
            },
        });

        this.marcasService.obtenerMarcas().subscribe({
            next: (data) => {
                this.totalMarcas.set(data.length);
                this.cargandoMarcas.set(false);
            },
            error: () => {
                this.error.set(true);
                this.cargandoMarcas.set(false);
            },
        });

        this.productosService.obtenerProducto().subscribe({
            next: (data) => {
                this.totalProductos.set(data.length);
                this.cargandoProductos.set(false);
            },
            error: () => {
                this.error.set(true);
                this.cargandoProductos.set(false);
            },
        });
    }
}