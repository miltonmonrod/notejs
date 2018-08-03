import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UsersComponent } from './users.component';
import {UsersRoutingModule} from './users-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
import { UsuariosService } from '../../services/usuario.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../auth/token.interceptor';
import {SelectModule} from 'ng-select';
import { SimpleNotificationsModule } from 'angular2-notifications';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    SharedModule,
    NgxDatatableModule,
    DxDataGridModule,
    DxButtonModule,
    SelectModule,
    SimpleNotificationsModule.forRoot()
  
  ],
  providers: [    
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }       
    ],
  declarations: [UsersComponent]
})
export class UsersModule { }
