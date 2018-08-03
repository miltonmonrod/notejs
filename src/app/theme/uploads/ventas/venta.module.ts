import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaComponent } from './venta.component';
import { VentaRoutingModule } from './venta-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { DxDataGridModule } from 'devextreme-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../../auth/token.interceptor';
import { DxCheckBoxModule, DxFileUploaderModule, DxSelectBoxModule } from 'devextreme-angular';
import { SimpleNotificationsModule } from 'angular2-notifications';
@NgModule({
  imports: [
    CommonModule,
    VentaRoutingModule,
    SharedModule,
    DxDataGridModule,
    DxCheckBoxModule,
    DxFileUploaderModule,
    DxSelectBoxModule,
    SimpleNotificationsModule.forRoot()

  ],
  providers: [

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  declarations: [VentaComponent]
})
export class VentaModule { }
