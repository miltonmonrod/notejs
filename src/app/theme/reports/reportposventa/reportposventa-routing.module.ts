
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReportPosVentaComponent} from './reportposventa.component';

const routes: Routes = [
  {
    path: '',
    component: ReportPosVentaComponent,
    data: {
      title: 'Reporte medición Posventas',
      icon: 'ti-bar-chart-alt',
      caption: 'Reporte estadistico de la medición en PosVentas',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportPosVentaRoutingModule { }
