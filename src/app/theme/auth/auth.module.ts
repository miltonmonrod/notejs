import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
    ],
  declarations: []
})
export class AuthModule { }
