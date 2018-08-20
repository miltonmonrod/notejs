import {NgModule, Optional, SkipSelf} from '@angular/core';


import {BaseRequestOptions} from "@angular/http";
import {StorageService} from "./services/storage.service";
import {AppAuthGuard} from "./guards/authorizated.guard";

@NgModule({
  declarations: [  ],
  imports: [],
  providers: [
    StorageService,
    AppAuthGuard,   
    BaseRequestOptions
  ],
  bootstrap: []
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}