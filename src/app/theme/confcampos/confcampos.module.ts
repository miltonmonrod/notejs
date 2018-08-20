import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfCamposComponent } from './confcampos.component';
import { ConfCamposRoutingModule } from './confcampos-rounting-modue';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DxDataGridModule, DxButtonModule, DxListModule, DxSelectBoxModule } from 'devextreme-angular';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../auth/token.interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfCamposRoutingModule,
    SharedModule,
    NgxDatatableModule,
    DxDataGridModule,
    DxButtonModule,
    DxListModule,
    DxSelectBoxModule,
    AngularDualListBoxModule,
    SimpleNotificationsModule.forRoot()

  ],
  providers: [
      {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
      }
  ],
  declarations: [
    ConfCamposComponent]
})
export class ConfCamposModule { }
