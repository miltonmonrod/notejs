import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrazaXproductoComponent} from './trazaxproducto.component';

const routes: Routes = [
  {
    path: '',
    component: TrazaXproductoComponent,
    data: {
      title: 'Reporte traza por producto',
      icon: 'ti-user',
      caption: 'Reporte periodico TRAZA por producto',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrazaXproductoRoutingModule { }
