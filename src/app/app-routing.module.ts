import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { AppAuthGuard } from './core/guards/authorizated.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: AdminComponent, 
    loadChildren: './theme/dashboard/dashboard.module#DashboardModule',
    canActivate: [AppAuthGuard]
  },
  {
    path: 'inicio',
    loadChildren: './theme/inicio/inicio.module#InicioModule',
  },
  {
    path: 'crearcampos',
    component: AdminComponent, 
    loadChildren: './theme/crearcampos/parametricas.module#ParametricasModule',
    canActivate: [AppAuthGuard]
  },
  {
    path: 'confcampos',
    component: AdminComponent, 
    loadChildren: './theme/confcampos/confcampos.module#ConfCamposModule',
    canActivate: [AppAuthGuard]
  },
  {
    path: 'trazaxproducto',
    component: AdminComponent, 
    loadChildren: './theme/trazaxproducto/trazaxproducto.module#TrazaXproductoModule',
    canActivate: [AppAuthGuard]
  },
  {
    path: 'historial',
    component: AdminComponent, 
    loadChildren: './theme/historial/historial.module#HistorialXproductoModule',
    canActivate: [AppAuthGuard]
  },
  {
    path: 'repdisponibilidad',
    component: AdminComponent, 
    loadChildren: './theme/repdisponibilidad/repdisponibilidad.module#RepDisponibilidadModule',
    canActivate: [AppAuthGuard]
  },
  {
    path: 'repdispsolpen',
    component: AdminComponent, 
    loadChildren: './theme/repdispsolpen/repdispsolpen.module#RepDispSolPenModule',
    canActivate: [AppAuthGuard]
  },
  {
    path: 'repsolicitudes',
    component: AdminComponent, 
    loadChildren: './theme/repsolicitudes/repsolicitudes.module#RepSolicitudesModule',
    canActivate: [AppAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }