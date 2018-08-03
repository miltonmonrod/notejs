import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PosVentaComponent } from './posventa.component';
import {PosVentaRoutingModule} from './posventa-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import { DxDataGridModule, DxCheckBoxModule, DxFileUploaderModule, DxSelectBoxModule } from 'devextreme-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../../auth/token.interceptor';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    PosVentaRoutingModule,
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
  declarations: [PosVentaComponent]
})
export class PosVentaModule {
  
 }
