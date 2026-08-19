import { Component } from '@angular/core';
import { Sidebar } from '../../../features/admin/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-admin-layout',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './admin-layout.html',
})
export class AdminLayout {

}