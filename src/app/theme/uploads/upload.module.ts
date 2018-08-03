import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UploadRoutingModule} from './upload-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    UploadRoutingModule,
    SharedModule,
    DxDataGridModule,
  ],
  declarations: []
})
export class UploadModule { }
