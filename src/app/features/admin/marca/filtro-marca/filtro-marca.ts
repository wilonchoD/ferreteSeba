import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-filtro-marcas',
  imports: [InputTextModule, FloatLabel, IconFieldModule, InputIconModule, ButtonModule],
  templateUrl: './filtro-marca.html',
  styles: ``,
})
export class FiltroMarcas {

}