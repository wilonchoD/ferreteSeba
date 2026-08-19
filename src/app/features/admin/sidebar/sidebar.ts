import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,

  imports: [
    MenuModule,
    BadgeModule,
    RippleModule,
    AvatarModule,
    RouterModule
  ],

  templateUrl: './sidebar.html',
  styles: ``
})
export class Sidebar implements OnInit {

  menuItems: MenuItem[] = [];

  ngOnInit(): void {

    this.menuItems = [

      {
        label: 'Categorías',
        icon: 'pi pi-sitemap',
        routerLink: '/admin/lista-categorias'
      },

      {
        label: 'Productos',
        icon: 'pi pi-box',
        routerLink: '/admin/lista-productos'
      },

      {
        label: 'Marcas',
        icon: 'pi pi-tags',
        routerLink: '/admin/lista-marcas'
      }

    ];
  }
}