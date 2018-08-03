import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HistorialXproductoComponent } from './historial.component';

const routes: Routes = [
  {
    path: '',
    component: HistorialXproductoComponent,
    data: {
      title: 'Historial de reporte traza por producto',
      icon: 'ti-user',
      caption: 'Historial de reportes TRAZA',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorialXproductoRoutingModule { }
