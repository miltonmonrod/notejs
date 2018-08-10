webpackJsonp([11],{Ks4s:function(t,e){t.exports="form {\n  margin-top: 15px; }\n\n.checkbox {\n  margin-top: inherit; }\n\nul.nav-tabs {\n  cursor: pointer; }\n"},byZv:function(t,e){t.exports='<simple-notifications [options]="options"></simple-notifications>\n\x3c!-- <ng-template [ngIf]="_usuario.UsuarioRolID==\'admin\'" [ngIfElse]="noautorizado" > --\x3e\n<div class="page-body">\n  \x3c!--profile cover end--\x3e\n  <div class="row" *ngIf="displayLista">\n    <div class="col-lg-12">\n      <button type="button" (click)="showPanel(\'C\')" class="btn btn-primary m-b-0">Crear nueva configuraci\xf3n</button>\n    </div>\n  </div>\n  <br/>\n  <div class="row">\n    <div class="col-sm-12">\n      <app-card *ngIf="displayLista" [title]="\'Configuraci\xf3n de campos por direcci\xf3n para el reporte TRAZA por producto\'" [cardOptionBlock]="true">\n        <dx-data-grid id="gridContainer" [dataSource]="Lista" showBorders="true" [columnAutoWidth]="true" [rowAlternationEnabled]="true">\n          <dxo-export [enabled]="true" fileName="Configurar Reporte por producto"></dxo-export>\n          <dxo-filter-row [visible]="true"></dxo-filter-row>\n          <dxo-header-filter [visible]="true"></dxo-header-filter>\n          <dxo-group-panel [visible]="true" emptyPanelText="Arrastra una columna aqu\xed para agrupar por ella"></dxo-group-panel>\n          <dxo-search-panel [visible]="true" [width]="240" placeholder="Buscar..."></dxo-search-panel>\n          <dxi-column caption="Acciones" cellTemplate="accionCellTemplate"></dxi-column>\n          <dxi-column dataField="idreportetipoproducto" caption="ID" [visible]="false"></dxi-column>\n          <dxi-column dataField="vigencia" caption="Vigencia"></dxi-column>\n          <dxi-column dataField="nombretipoproducto" caption="Tipo producto"></dxi-column>\n          <dxi-column dataField="nombretiporeporte" caption="Nombre tipo reporte"></dxi-column>\n          <dxi-column dataField="nombreestado" caption="Estado"></dxi-column>\n          <dxi-column dataField="fechacreacionformat" caption="Fecha creaci\xf3n"></dxi-column>\n          <dxi-column dataField="usuariocreacion" caption="Usuario creaci\xf3n"></dxi-column>\n          <dxo-remote-operations [sorting]="true" [paging]="true">\n          </dxo-remote-operations>\n          <dxo-summary>\n            <dxi-total-item column="idreportetipoproducto" summaryType="count" displayFormat="Cantidad: {0}">\n            </dxi-total-item>\n          </dxo-summary>\n          <dxo-paging [pageSize]="10"></dxo-paging>\n          <dxo-pager [showPageSizeSelector]="true" [allowedPageSizes]="[10, 20, 40]"></dxo-pager>\n          <div *dxTemplate="let d of \'accionCellTemplate\'">\n            <div class="button-cell" style="text-align: center;">\n              <i style="font-size:20px; cursor:pointer;" class="icofont icofont-law-document" placement="right" ngbTooltip="Actualizar"\n                (click)="cargarEditCampo(d.data.idreportetipoproducto)"></i>\n            </div>\n          </div>\n        </dx-data-grid>\n      </app-card>\n    </div>\n    <div class="col-sm-12">\n      <app-card *ngIf="displayCrear" [title]="\'Crear nueva configuraci\xf3n\'" [blockClass]="\'box-list m-t-15\'">\n        <form #formCc="ngForm" (ngSubmit)="onSubmit(formCc.valid)">\n          <div class="row">\n            <div class="col-sm-12">\n              <div class="form-group row">\n                <label class="col-sm-4 col-form-label">* Vigencia:</label>\n                <div class="col-sm-8">\n                  <select class="form-control" required [class.form-control-danger]="class_vigencia" name="vigencia" #vigencia [(ngModel)]="reporteTP.vigencia"\n                    (change)="class_vigencia = reporteTP.vigencia === null;">\n                    <option *ngFor="let item of ListaVigencia" [ngValue]="item.Id">{{item.Nombre}}</option>\n                  </select>\n                </div>\n              </div>\n              <div class="form-group row">\n                <label class="col-sm-4 col-form-label">* Tipo archivo:</label>\n                <div class="col-sm-8">\n                  <select class="form-control" required [class.form-control-danger]="class_codtiporeporte" name="codtiporeporte" #codtiporeporte\n                    [(ngModel)]="reporteTP.codtiporeporte" (change)="class_codtiporeporte = reporteTP.codtiporeporte === null;">\n                    <option *ngFor="let item of ListaTipoA" [ngValue]="item.Id">{{item.Nombre}}</option>\n                  </select>\n                </div>\n              </div>\n              <div class="form-group row">\n                <label class="col-sm-4 col-form-label">* Tipo producto:</label>\n                <div class="col-sm-8">\n                  <select class="form-control" required [class.form-control-danger]="class_idtipoproducto" name="idtipoproducto" #idtipoproducto\n                    [(ngModel)]="reporteTP.idtipoproducto" (change)="class_idtipoproducto = reporteTP.idtipoproducto === null;">\n                    <option *ngFor="let item of ListaTipoProducto" [ngValue]="item.Id">{{item.Nombre}}</option>\n                  </select>\n                </div>\n              </div>\n              <div class="form-group row">\n                <label class="col-sm-4 col-form-label">* D\xeda m\xe1ximo del mes para reportar:</label>\n                <div class="col-sm-8">\n                  <input type="number" class="form-control" [class.form-control-danger]="(formCc.submitted && diafrecuencia.invalid) || (diafrecuencia.touched && diafrecuencia.invalid)"\n                    name="diafrecuencia" #diafrecuencia="ngModel" [(ngModel)]="reporteTP.diafrecuencia" required>\n                </div>\n              </div>\n              <div class="form-group row">\n                <label class="col-sm-4 col-form-label">* Estado:</label>\n                <div class="col-sm-8">\n                  <select class="form-control" required [class.form-control-danger]="class_estado" name="estado" #estado [(ngModel)]="reporteTP.estado"\n                    (change)="class_estado = reporteTP.estado === \'\'">\n                    <option *ngFor="let item of ListaEstado" [ngValue]="item.Id">{{item.Nombre}}</option>\n                  </select>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class="row" *ngIf="reporteTP.idreportetipoproducto != 0">\n            <div class="col-sm-12">\n                <dual-list [sort]="keepSorted" [source]="ListaCampos" [key]="key" [display]="display" [filter]="filter"\n                [(destination)]="ListaCamposSel" height="300px" [format]="format" [disabled]="disabled"></dual-list>\n            </div>\n          </div>\n          <br/>\n          <div class="row">\n            <div class="col-sm-12">\n              <button type="submit" class="btn btn-primary m-b-0">Guardar</button>\n              <button type="button" (click)="showPanel(\'V\')" class="btn btn-primary m-b-0">Volver</button>\n              <button type="button" *ngIf="reporteTP.idreportetipoproducto != 0" (click)="verArchivo()" class="btn btn-primary m-b-0">Visualizar archivo</button>\n            </div>\n          </div>\n        </form>\n      </app-card>\n    </div>\n  </div>\n</div>\n\n\x3c!-- </ng-template>\n<ng-template #noautorizado>\n  <div class="page-body">\n    <div class="row">\n      <div class="col-lg-12">\n          <div class="alert alert-danger background-danger">\n              <button type="button" class="close" >\n                <i class="icofont icofont-close-line-circled text-white"></i>\n              </button>\n              <strong>Acceso no autorizado!</strong> usted no tiene permiso para ingresar a este modulo\n            </div>\n      </div>\n    </div>\n  </div>\n</ng-template> --\x3e'},l8fg:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i("WT6e"),n=i("Xjw4"),r=i("7DMc"),a=i("WPXp"),s=i("aAKi"),l=i("p0v5"),c=i("T+dH"),d=i("HCek"),p=this&&this.__decorate||function(t,e,i,o){var n,r=arguments.length,a=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(a=(r<3?n(a):r>3?n(e,i,a):n(e,i))||a);return r>3&&a&&Object.defineProperty(e,i,a),a},u=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},f=function(){function t(t,e,i,o){this.parametricasService=t,this.authenticationService=e,this.storageService=i,this.servicePNotify=o,this.operacionConfCampos="C",this.format={add:"Adicionar",remove:"Remover",all:"Todos",none:"Ninguno",direction:"left-to-right",draggable:!0,locale:void 0},this.disabled=!1,this.filter=!1,this.keepSorted=!1,this.key="idconfigcamposreporte",this.display="nombrecampo",this.options={position:["bottom","right"]},this.inicializarModelo(),this.displayLista=!0,this.displayCrear=!1,this.ListaVigencia=[{Id:null,Nombre:"-- Seleccione una vigencia --"},{Id:2018,Nombre:"2018"}],this.ListaEstado=[{Id:"",Nombre:"-- Seleccione el estado --"},{Id:"A",Nombre:"Activo"},{Id:"I",Nombre:"Inactivo"}],this.ListaTipoA=[{Id:"",Nombre:"-- Seleccione el tipo de archivo --"},{Id:"C",Nombre:"Cabecera"},{Id:"D",Nombre:"Detalle"}],this.ListaTipoProducto=[{Id:null,Nombre:"-- Seleccione el tipo producto --"},{Id:1,Nombre:"Medicamentos"},{Id:2,Nombre:"Dispositivos m\xe9dicos y equipos biom\xe9dicos"},{Id:3,Nombre:"Alimentos"},{Id:4,Nombre:"Cosm\xe9ticos"},{Id:5,Nombre:"Producto de higiene dom\xe9stica"},{Id:6,Nombre:"Reactivos de diagn\xf3stico in-vitro"},{Id:7,Nombre:"Bebidas alcoholicas"},{Id:8,Nombre:"Reactivos in Vitro"},{Id:9,Nombre:"Producto absorbente de higiene personal"}]}return t.prototype.ngAfterViewInit=function(){this.options={position:["bottom","right"],maxStack:8,timeOut:5e3,showProgressBar:!0,pauseOnHover:!0,lastOnBottom:!0,clickToClose:!0,preventDuplicates:!1,preventLastDuplicates:!1,theClass:"bg-c-pink no-icon",rtl:!1,animate:"rotate"}},t.prototype.ngOnInit=function(){this.getConfigCampos()},t.prototype.getConfigCampos=function(){var t=this;this.parametricasService.getAllReporteTP().subscribe(function(e){t.Lista=e},function(e){t.error=e,"Unauthorized"===e.statusText&&(t.servicePNotify.error("TRAZA","Se perdio la sesi\xf3n, por favor loguearse de nuevo",""),t.authenticationService.logout().subscribe(function(t){}),t.storageService.logout()),console.log(e)})},t.prototype.getCamposDisponibles=function(t){var e=this;this.parametricasService.getAllConfCamposActivos().subscribe(function(i){e.ListaCampos=i,e.getCamposSeleccionados(t)},function(t){e.error=t,"Unauthorized"===t.statusText&&(e.servicePNotify.error("TRAZA","Se perdio la sesi\xf3n, por favor loguearse de nuevo",""),e.authenticationService.logout().subscribe(function(t){}),e.storageService.logout()),console.log(t)})},t.prototype.getCamposSeleccionados=function(t){var e=this;this.parametricasService.findAllCamposByTipoProducto(t).subscribe(function(t){e.ListaCamposSel=t},function(t){e.error=t,"Unauthorized"===t.statusText&&(e.servicePNotify.error("TRAZA","Se perdio la sesi\xf3n, por favor loguearse de nuevo",""),e.authenticationService.logout().subscribe(function(t){}),e.storageService.logout()),console.log(t)})},t.prototype.inicializarModelo=function(){this.reporteTP={idreportetipoproducto:0,codtiporeporte:"",nombretiporeporte:"",estado:"",nombreestado:"",fechacreacion:null,fechacreacionformat:"",usuariocreacion:"",fechamodificacion:null,fechamodificacionformat:"",usuariomodificacion:"",fechainivigencia:null,fechafinvigencia:null,vigencia:null,diafrecuencia:null,idtipoproducto:null,nombretipoproducto:"",camposSeleccionados:[]},this.operacionConfCampos="C",this.class_vigencia=!1,this.class_estado=!1,this.class_codtiporeporte=!1,this.class_idtipoproducto=!1},t.prototype.showPanel=function(t){"C"===t?(this.displayLista=!1,this.displayCrear=!0,this.inicializarModelo()):"V"===t&&(this.displayLista=!0,this.displayCrear=!1,this.inicializarModelo(),this.getConfigCampos())},t.prototype.cargarEditCampo=function(t){var e=this;this.operacionConfCampos="U",this.parametricasService.getReporteTPById(t).subscribe(function(t){e.reporteTP=t,e.displayLista=!1,e.displayCrear=!0,e.getCamposDisponibles(e.reporteTP.idreportetipoproducto)},function(t){e.error=t,"Unauthorized"===t.statusText&&(e.servicePNotify.error("TRAZA","Se perdio la sesi\xf3n, por favor loguearse de nuevo",""),e.authenticationService.logout().subscribe(function(t){}),e.storageService.logout()),console.log(t)})},t.prototype.onSubmit=function(t){var e=this;this.class_vigencia=null===this.reporteTP.vigencia,this.class_estado=""===this.reporteTP.estado,this.class_codtiporeporte=""==this.reporteTP.codtiporeporte,this.class_idtipoproducto=null===this.reporteTP.idtipoproducto,!t||this.class_vigencia||this.class_estado||this.class_codtiporeporte||this.class_idtipoproducto||("C"===this.operacionConfCampos?(this.reporteTP.usuariocreacion="mmontenegror",this.parametricasService.addReporteTP(this.reporteTP).subscribe(function(t){t.operacionExitosa?(e.servicePNotify.html("<h4>Guardado de datos</h4><p>Los datos se han guardado correctamente!</p>","info"),e.reporteTP=t.entidad,e.operacionConfCampos="U",e.class_vigencia=!1,e.class_estado=!1,e.class_codtiporeporte=!1,e.class_idtipoproducto=!1,e.getCamposDisponibles(e.reporteTP.idreportetipoproducto)):e.servicePNotify.html("<h4>Error al salvar los datos <p>"+t.mensaje+"</p></h4>","error")},function(t){e.error=t,"Unauthorized"===e.error.statusText&&(e.authenticationService.logout().subscribe(function(t){}),e.storageService.logout()),console.log(t)})):"U"===this.operacionConfCampos&&(this.reporteTP.usuariocreacion="mmontenegror",this.reporteTP.camposSeleccionados=this.ListaCamposSel,0===this.reporteTP.camposSeleccionados.length?this.servicePNotify.html("<h4>Seleccione las columnas que componen el archivo a configurar!</h4>","error"):this.parametricasService.updateReporteTP(this.reporteTP).subscribe(function(t){t.operacionExitosa?(e.servicePNotify.html("<h4>Guardado de datos</h4><p>Los datos se han editado correctamente!</p>","info"),e.showPanel("V")):e.servicePNotify.html("<h4>Error al salvar los datos <p>"+t.mensaje+"</p></h4>","error")},function(t){e.error=t,"Unauthorized"===e.error.statusText&&(e.authenticationService.logout().subscribe(function(t){}),e.storageService.logout()),console.log(t)})))},t.prototype.verArchivo=function(){var t=this;this.parametricasService.getCsvByTipoReporteId(this.reporteTP.idreportetipoproducto).subscribe(function(e){e.operacionExitosa?(t.columnas=[],t.columnas.push(e.columnas),t.exportToCsv(e.nombreArchivo,t.columnas)):t.servicePNotify.html("<h4>Error al consutruir el archivo <p>"+e.mensaje+"</p></h4>","error")},function(e){t.error=e,"Unauthorized"===t.error.statusText&&(t.authenticationService.logout().subscribe(function(t){}),t.storageService.logout()),console.log(e)})},t.prototype.exportToCsv=function(t,e){for(var i=function(t){for(var e="",i=0;i<t.length;i++){var o=null===t[i]?"":t[i].toString();t[i]instanceof Date&&(o=t[i].toLocaleString());var n=o.replace(/"/g,'""');n.search(/("|,|\n)/g)>=0&&(n='"'+n+'"'),i>0&&(e+=";"),e+=n}return e+"\n"},o="",n=0;n<e.length;n++)o+=i(e[n]);var r=new Blob(["\ufeff",o],{type:"text/csv;charset=UTF-8;"});if(navigator.msSaveBlob)navigator.msSaveBlob(r,t);else{var a=document.createElement("a");if(void 0!==a.download){var s=URL.createObjectURL(r);a.setAttribute("href",s),a.setAttribute("download",t),a.style.visibility="hidden",document.body.appendChild(a),a.click(),document.body.removeChild(a)}}},t=p([Object(o.Component)({selector:"app-contratos",template:i("byZv"),styles:[i("Ks4s"),i("3FNq")],animations:[Object(a.trigger)("fadeInOutTranslate",[Object(a.transition)(":enter",[Object(a.style)({opacity:0}),Object(a.animate)("400ms ease-in-out",Object(a.style)({opacity:1}))]),Object(a.transition)(":leave",[Object(a.style)({transform:"translate(0)"}),Object(a.animate)("400ms ease-in-out",Object(a.style)({opacity:0}))])])],providers:[s.a]}),u("design:paramtypes",[s.a,l.a,c.a,d.NotificationsService])],t)}(),m=i("bfOx"),h=this&&this.__decorate||function(t,e,i,o){var n,r=arguments.length,a=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(a=(r<3?n(a):r>3?n(e,i,a):n(e,i))||a);return r>3&&a&&Object.defineProperty(e,i,a),a},b=[{path:"",component:f,data:{title:"Parametricas",icon:"ti-user",caption:"Administraci\xf3n de parametricas del sistema TRAZA",status:!0}}],g=function(){function t(){}return t=h([Object(o.NgModule)({imports:[m.g.forChild(b)],exports:[m.g]})],t)}(),v=i("fAE3"),y=i("oHSm"),x=i("EAH6"),k=i("ItHS"),I=i("rfEI"),C=function(){function t(t){this._name=t,this.last=null,this.picker="",this.dragStart=!1,this.dragOver=!1,this.pick=[],this.list=[],this.sift=[]}return Object.defineProperty(t.prototype,"name",{get:function(){return this._name},enumerable:!0,configurable:!0}),t}(),T=0,S=function(){function t(e){this.differs=e,this.id="dual-list-"+T++,this.key="_id",this.display="_name",this.height="100px",this.filter=!1,this.format=t.DEFAULT_FORMAT,this.sort=!1,this.disabled=!1,this.destinationChange=new o.EventEmitter,this.sorter=function(t,e){return t._name<e._name?-1:t._name>e._name?1:0},this.available=new C(t.AVAILABLE_LIST_NAME),this.confirmed=new C(t.CONFIRMED_LIST_NAME)}return t.prototype.ngOnChanges=function(e){e.filter&&!1===e.filter.currentValue&&(this.clearFilter(this.available),this.clearFilter(this.confirmed)),e.sort&&(!0===e.sort.currentValue&&void 0===this.compare?this.compare=this.sorter:!1===e.sort.currentValue&&(this.compare=void 0)),e.format&&(this.format=e.format.currentValue,"undefined"==typeof this.format.direction&&(this.format.direction=t.LTR),"undefined"==typeof this.format.add&&(this.format.add=t.DEFAULT_FORMAT.add),"undefined"==typeof this.format.remove&&(this.format.remove=t.DEFAULT_FORMAT.remove),"undefined"==typeof this.format.all&&(this.format.all=t.DEFAULT_FORMAT.all),"undefined"==typeof this.format.none&&(this.format.none=t.DEFAULT_FORMAT.none),"undefined"==typeof this.format.draggable&&(this.format.draggable=t.DEFAULT_FORMAT.draggable)),e.source&&(this.available=new C(t.AVAILABLE_LIST_NAME),this.updatedSource(),this.updatedDestination()),e.destination&&(this.confirmed=new C(t.CONFIRMED_LIST_NAME),this.updatedDestination(),this.updatedSource())},t.prototype.ngDoCheck=function(){this.source&&this.buildAvailable(this.source)&&this.onFilter(this.available),this.destination&&this.buildConfirmed(this.destination)&&this.onFilter(this.confirmed)},t.prototype.buildAvailable=function(t){var e=this,i=this.sourceDiffer.diff(t);return!!i&&(i.forEachRemovedItem(function(t){var i=e.findItemIndex(e.available.list,t.item,e.key);-1!==i&&e.available.list.splice(i,1)}),i.forEachAddedItem(function(t){-1===e.findItemIndex(e.available.list,t.item,e.key)&&e.available.list.push({_id:e.makeId(t.item),_name:e.makeName(t.item)})}),void 0!==this.compare&&this.available.list.sort(this.compare),this.available.sift=this.available.list,!0)},t.prototype.buildConfirmed=function(t){var e=this,i=!1,o=this.destinationDiffer.diff(t);return!!o&&(o.forEachRemovedItem(function(t){var o=e.findItemIndex(e.confirmed.list,t.item,e.key);-1!==o&&(e.isItemSelected(e.confirmed.pick,e.confirmed.list[o])||e.selectItem(e.confirmed.pick,e.confirmed.list[o]),e.moveItem(e.confirmed,e.available,e.confirmed.list[o],!1),i=!0)}),o.forEachAddedItem(function(t){var o=e.findItemIndex(e.available.list,t.item,e.key);-1!==o&&(e.isItemSelected(e.available.pick,e.available.list[o])||e.selectItem(e.available.pick,e.available.list[o]),e.moveItem(e.available,e.confirmed,e.available.list[o],!1),i=!0)}),void 0!==this.compare&&this.confirmed.list.sort(this.compare),this.confirmed.sift=this.confirmed.list,i&&this.trueUp(),!0)},t.prototype.updatedSource=function(){this.available.list.length=0,this.available.pick.length=0,void 0!==this.source&&(this.sourceDiffer=this.differs.find(this.source).create(null))},t.prototype.updatedDestination=function(){void 0!==this.destination&&(this.destinationDiffer=this.differs.find(this.destination).create(null))},t.prototype.direction=function(){return this.format.direction===t.LTR},t.prototype.dragEnd=function(t){return void 0===t&&(t=null),t?t.dragStart=!1:(this.available.dragStart=!1,this.confirmed.dragStart=!1),!1},t.prototype.drag=function(t,e,i){this.isItemSelected(i.pick,e)||this.selectItem(i.pick,e),i.dragStart=!0,t.dataTransfer.setData(this.id,e._id)},t.prototype.allowDrop=function(t,e){return t.dataTransfer.types.length&&t.dataTransfer.types[0]===this.id&&(t.preventDefault(),e.dragStart||(e.dragOver=!0)),!1},t.prototype.dragLeave=function(){this.available.dragOver=!1,this.confirmed.dragOver=!1},t.prototype.drop=function(t,e){t.dataTransfer.types.length&&t.dataTransfer.types[0]===this.id&&(t.preventDefault(),this.dragLeave(),this.dragEnd(),e===this.available?this.moveItem(this.available,this.confirmed):this.moveItem(this.confirmed,this.available))},t.prototype.trueUp=function(){for(var t=this,e=!1,i=this.destination.length;(i-=1)>=0;){0===this.confirmed.list.filter(function(e){return"object"==typeof t.destination[i]?e._id===t.destination[i][t.key]:e._id===t.destination[i]}).length&&(this.destination.splice(i,1),e=!0)}for(var o=function(i,o){var r=n.destination.filter(function(e){return"object"==typeof e?e[t.key]===t.confirmed.list[i]._id:e===t.confirmed.list[i]._id});0===r.length&&(r=n.source.filter(function(e){return"object"==typeof e?e[t.key]===t.confirmed.list[i]._id:e===t.confirmed.list[i]._id})).length>0&&(n.destination.push(r[0]),e=!0)},n=this,r=0,a=this.confirmed.list.length;r<a;r+=1)o(r);e&&this.destinationChange.emit(this.destination)},t.prototype.findItemIndex=function(t,e,i){void 0===i&&(i="_id");var o=-1;return"object"==typeof e?t.filter(function(n){return n._id===e[i]&&(o=t.indexOf(n),!0)}):t.filter(function(i){return i._id===e&&(o=t.indexOf(i),!0)}),o},t.prototype.makeUnavailable=function(t,e){var i=t.list.indexOf(e);-1!==i&&t.list.splice(i,1)},t.prototype.moveItem=function(t,e,i,o){var n=this;void 0===i&&(i=null),void 0===o&&(o=!0);var r=0,a=t.pick.length;i&&(a=(r=t.list.indexOf(i))+1);for(var s=function(){var o=[];if(i){var n=l.findItemIndex(t.pick,i);-1!==n&&(o[0]=t.pick[n])}else o=t.list.filter(function(e){return e._id===t.pick[r]._id});1===o.length&&(0===e.list.filter(function(t){return t._id===o[0]._id}).length&&e.list.push(o[0]),l.makeUnavailable(t,o[0]))},l=this;r<a;r+=1)s();void 0!==this.compare&&e.list.sort(this.compare),t.pick.length=0,o&&this.trueUp(),setTimeout(function(){n.onFilter(t),n.onFilter(e)},10)},t.prototype.isItemSelected=function(t,e){return t.filter(function(t){return Object.is(t,e)}).length>0},t.prototype.shiftClick=function(t,e,i,o){if(t.shiftKey&&i.last&&!Object.is(o,i.last)){var n=i.sift.indexOf(i.last);if(e>n)for(var r=n+1;r<e;r+=1)this.selectItem(i.pick,i.sift[r]);else if(-1!==n)for(r=e+1;r<n;r+=1)this.selectItem(i.pick,i.sift[r])}i.last=o},t.prototype.selectItem=function(t,e){var i=t.filter(function(t){return Object.is(t,e)});if(i.length>0)for(var o=0,n=i.length;o<n;o+=1){var r=t.indexOf(i[o]);-1!==r&&t.splice(r,1)}else t.push(e)},t.prototype.selectAll=function(t){t.pick.length=0,t.pick=t.sift.slice(0)},t.prototype.selectNone=function(t){t.pick.length=0},t.prototype.isAllSelected=function(t){return 0===t.list.length||t.list.length===t.pick.length},t.prototype.isAnySelected=function(t){return t.pick.length>0},t.prototype.unpick=function(t){for(var e=t.pick.length-1;e>=0;e-=1)-1===t.sift.indexOf(t.pick[e])&&t.pick.splice(e,1)},t.prototype.clearFilter=function(t){t&&(t.picker="",this.onFilter(t))},t.prototype.onFilter=function(t){var e=this;if(t.picker.length>0)try{var i=t.list.filter(function(i){return"[object Object]"===Object.prototype.toString.call(i)?void 0!==i._name?-1!==i._name.toLocaleLowerCase(e.format.locale).indexOf(t.picker.toLocaleLowerCase(e.format.locale)):-1!==JSON.stringify(i).toLocaleLowerCase(e.format.locale).indexOf(t.picker.toLocaleLowerCase(e.format.locale)):-1!==i.toLocaleLowerCase(e.format.locale).indexOf(t.picker.toLocaleLowerCase(e.format.locale))});t.sift=i,this.unpick(t)}catch(e){e instanceof RangeError&&(this.format.locale=void 0),t.sift=t.list}else t.sift=t.list},t.prototype.makeId=function(t){return"object"==typeof t?t[this.key]:t},t.prototype.makeName=function(t,e){void 0===e&&(e="_");var i=this.display;function o(t){switch(Object.prototype.toString.call(t)){case"[object Number]":case"[object String]":return t;default:return void 0!==t?t[i]:"undefined"}}var n="";if(void 0!==this.display)switch(Object.prototype.toString.call(this.display)){case"[object Function]":n=this.display(t);break;case"[object Array]":for(var r=0,a=this.display.length;r<a;r+=1)if(n.length>0&&(n+=e),-1===this.display[r].indexOf("."))n+=t[this.display[r]];else{var s=this.display[r].split("."),l=t[s[0]];if(l)if(-1!==s[1].indexOf("substring")){var c=s[1].substring(s[1].indexOf("(")+1,s[1].indexOf(")")).split(",");switch(c.length){case 1:n+=l.substring(parseInt(c[0],10));break;case 2:n+=l.substring(parseInt(c[0],10),parseInt(c[1],10));break;default:n+=l}}else n+=l}break;default:n=o(t)}else n=o(t);return n},t}();S.AVAILABLE_LIST_NAME="available",S.CONFIRMED_LIST_NAME="confirmed",S.LTR="left-to-right",S.RTL="right-to-left",S.DEFAULT_FORMAT={add:"Add",remove:"Remove",all:"All",none:"None",direction:S.LTR,draggable:!0,locale:void 0},S.decorators=[{type:o.Component,args:[{selector:"dual-list",template:'\n   <div class="dual-list">\n   \t<div class="listbox" [ngStyle]="{ \'order\' :  direction() ? 1 : 2, \'margin-left\' : direction() ? 0 : \'10px\' }">\n   \t\t<button type="button" name="addBtn" class="btn btn-primary btn-block"\n   \t\t\t(click)="moveItem(available, confirmed)" [ngClass]="direction() ? \'point-right\' : \'point-left\'"\n   \t\t\t[disabled]="available.pick.length === 0">{{format.add}}</button>\n\n   \t\t<form *ngIf="filter" class="filter">\n   \t\t\t<input class="form-control" name="filterSource" [(ngModel)]="available.picker" (ngModelChange)="onFilter(available)">\n   \t\t</form>\n\n   \t\t<div class="record-picker">\n   \t\t\t<ul [ngStyle]="{\'max-height\': height, \'min-height\': height}" [ngClass]="{over:available.dragOver}"\n   \t\t\t\t(drop)="drop($event, confirmed)" (dragover)="allowDrop($event, available)" (dragleave)="dragLeave()">\n   \t\t\t\t<li *ngFor="let item of available.sift; let idx=index;"\n   \t\t\t\t\t(click)="disabled ? null : selectItem(available.pick, item); shiftClick($event, idx, available, item)"\n   \t\t\t\t\t[ngClass]="{selected: isItemSelected(available.pick, item), disabled: disabled}"\n   \t\t\t\t\t[draggable]="!disabled && format.draggable" (dragstart)="drag($event, item, available)" (dragend)="dragEnd(available)"\n   \t\t\t\t><label>{{item._name}}</label></li>\n   \t\t\t</ul>\n   \t\t</div>\n\n   \t\t<div class="button-bar">\n   \t\t\t<button type="button" class="btn btn-primary pull-left" (click)="selectAll(available)"\n   \t\t\t\t[disabled]="disabled || isAllSelected(available)">{{format.all}}</button>\n   \t\t\t<button type="button" class="btn btn-default pull-right" (click)="selectNone(available)"\n   \t\t\t\t[disabled]="!isAnySelected(available)">{{format.none}}</button>\n   \t\t</div>\n   \t</div>\n\n   \t<div class="listbox" [ngStyle]="{ \'order\' : direction() ? 2 : 1, \'margin-left\' : direction() ? \'10px\' : 0 }">\n   \t\t<button type="button" name="removeBtn" class="btn btn-primary btn-block"\n   \t\t\t(click)="moveItem(confirmed, available)" [ngClass]="direction() ? \'point-left\' : \'point-right\'"\n   \t\t\t[disabled]="confirmed.pick.length === 0">{{format.remove}}</button>\n\n   \t\t<form *ngIf="filter" class="filter">\n   \t\t\t<input class="form-control" name="filterDestination" [(ngModel)]="confirmed.picker" (ngModelChange)="onFilter(confirmed)">\n   \t\t</form>\n\n   \t\t<div class="record-picker">\n   \t\t\t<ul [ngStyle]="{\'max-height\': height, \'min-height\': height}" [ngClass]="{over:confirmed.dragOver}"\n   \t\t\t\t(drop)="drop($event, available)" (dragover)="allowDrop($event, confirmed)" (dragleave)="dragLeave()">\n   \t\t\t\t<li #itmConf *ngFor="let item of confirmed.sift; let idx=index;"\n   \t\t\t\t\t(click)="disabled ? null : selectItem(confirmed.pick, item); shiftClick($event, idx, confirmed, item)"\n   \t\t\t\t\t[ngClass]="{selected: isItemSelected(confirmed.pick, item), disabled: disabled}"\n   \t\t\t\t\t[draggable]="!disabled && format.draggable" (dragstart)="drag($event, item, confirmed)" (dragend)="dragEnd(confirmed)"\n   \t\t\t\t><label>{{item._name}}</label></li>\n   \t\t\t</ul>\n   \t\t</div>\n\n   \t\t<div class="button-bar">\n   \t\t\t<button type="button" class="btn btn-primary pull-left" (click)="selectAll(confirmed)"\n   \t\t\t\t[disabled]="disabled || isAllSelected(confirmed)">{{format.all}}</button>\n   \t\t\t<button type="button" class="btn btn-default pull-right" (click)="selectNone(confirmed)"\n   \t\t\t\t[disabled]="!isAnySelected(confirmed)">{{format.none}}</button>\n   \t\t</div>\n   \t</div>\n   </div>\n\t',styles:['\n   div.record-picker {\n   \toverflow-x: hidden;\n   \toverflow-y: auto;\n   \tborder: 1px solid #ddd;\n   \tborder-radius:8px;\n   \tposition: relative;\n   \tcursor: pointer;\n   }\n\n   /* http://www.ourtuts.com/how-to-customize-browser-scrollbars-using-css3/ */\n   div.record-picker::-webkit-scrollbar {\n   \twidth: 12px;\n   }\n\n   div.record-picker::-webkit-scrollbar-button {\n   \twidth: 0px;\n   \theight: 0px;\n   }\n\n   div.record-picker {\n   \tscrollbar-base-color: #337ab7;\n   \tscrollbar-3dlight-color: #337ab7;\n   \tscrollbar-highlight-color: #337ab7;\n   \tscrollbar-track-color: #eee;\n   \tscrollbar-arrow-color: gray;\n   \tscrollbar-shadow-color: gray;\n   \tscrollbar-dark-shadow-color: gray;\n   }\n\n   div.record-picker::-webkit-scrollbar-track {\n   \tbackground:#eee;\n   \t-webkit-box-shadow: 0px 0px 3px #dfdfdf inset;\n   \t        box-shadow: 0px 0px 3px #dfdfdf inset;\n   \tborder-top-right-radius: 8px;\n   \tborder-bottom-right-radius: 8px;\n   }\n\n   div.record-picker::-webkit-scrollbar-thumb {\n   \tbackground: #337ab7;\n   \tborder: thin solid gray;\n   \tborder-top-right-radius: 8px;\n   \tborder-bottom-right-radius: 8px;\n   }\n\n   div.record-picker::-webkit-scrollbar-thumb:hover {\n   \tbackground: #286090;\n   }\n\n   .record-picker ul {\n   \tmargin: 0;\n   \tpadding: 0 0 1px 0;\n   }\n\n   .record-picker li {\n   \tborder-top: thin solid #ddd;\n   \tborder-bottom: 1px solid #ddd;\n   \tdisplay: block;\n   \tpadding: 2px 2px 2px 10px;\n   \tmargin-bottom: -1px;\n   \tfont-size: 0.85em;\n   \tcursor: pointer;\n   \twhite-space: nowrap;\n   \tmin-height:16px;\n   }\n\n   .record-picker li:hover {\n   \tbackground-color: #f5f5f5;\n   }\n\n   .record-picker li.selected {\n   \tbackground-color: #d9edf7;\n   }\n\n   .record-picker li.selected:hover {\n   \tbackground-color: #c4e3f3;\n   }\n\n   .record-picker li.disabled {\n   \topacity: 0.5;\n   \tcursor: default;\n   \tbackground-color: inherit;\n   }\n\n   .record-picker li:first-child {\n   \tborder-top-left-radius: 8px;\n   \tborder-top-right-radius: 8px;\n   \tborder-top: none;\n   }\n\n   .record-picker li:last-child {\n   \tborder-bottom-left-radius: 8px;\n   \tborder-bottom-right-radius: 8px;\n   \tborder-bottom: none;\n   }\n\n   .record-picker label {\n   \tcursor: pointer;\n   \tfont-weight: inherit;\n   \tfont-size: 14px;\n   \tpadding: 4px;\n   \tmargin-bottom: -1px;\n   \t-webkit-touch-callout: none;\n   \t-webkit-user-select: none;\n   \t-moz-user-select: none;\n   \t-ms-user-select: none;\n   \tuser-select: none;\n   }\n\n   .record-picker ul.over {\n   \tbackground-color:lightgray;\n   }\n\n   .dual-list  {\n   \tdisplay: -webkit-box;\n   \tdisplay: -ms-flexbox;\n   \tdisplay: flex;\n   \t-webkit-box-orient: horizontal;\n   \t-webkit-box-direction: normal;\n   \t    -ms-flex-direction: row;\n   \t        flex-direction: row;\n   \t-ms-flex-line-pack: start;\n   \t    align-content: flex-start;\n   }\n\n   .dual-list .listbox {\n   \twidth: 50%;\n   \tmargin: 0px;\n   }\n\n   .dual-list .button-bar {\n   \tmargin-top: 8px;\n   }\n\n   /* &nbsp;&nbsp;&nbsp;&#9654; */\n   .point-right::after {\n   \tcontent: "\\25B6";\n   \tpadding-left: 1em;\n   }\n\n   /* &#9664;&nbsp;&nbsp;&nbsp; */\n   .point-left::before {\n   \tcontent: "\\25C0";\n   \tpadding-right: 1em;\n   }\n\n   .dual-list .button-bar button {\n   \twidth: 47%;\n   }\n\n   button.btn-block {\n   \tdisplay: block;\n   \twidth: 100%;\n   \tmargin-bottom: 8px;\n   }\n\n   .filter {\n   \tmargin-bottom: -2.2em;\n   }\n\n   .filter::after {\n   \tcontent:"o";\n   \twidth:40px;\n   \tcolor:transparent;\n   \tfont-size:2em;\n   \tbackground-image:url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 64l192 192v192l128-32V256L512 64H0z"/></svg>\');\n   \tbackground-repeat:no-repeat;\n   \tbackground-position:center center;\n   \topacity:.2;\n   \ttop: -36px;\n   \tleft: calc(100% - 21px);\n   \tposition:relative;\n   }\n\t']}]}],S.ctorParameters=function(){return[{type:o.IterableDiffers}]},S.propDecorators={id:[{type:o.Input}],key:[{type:o.Input}],display:[{type:o.Input}],height:[{type:o.Input}],filter:[{type:o.Input}],format:[{type:o.Input}],sort:[{type:o.Input}],compare:[{type:o.Input}],disabled:[{type:o.Input}],source:[{type:o.Input}],destination:[{type:o.Input}],destinationChange:[{type:o.Output}]};var w=function(){return function(){}}();w.decorators=[{type:o.NgModule,args:[{imports:[n.CommonModule,r.FormsModule],declarations:[S],exports:[S]}]}],w.ctorParameters=function(){return[]},i.d(e,"ConfCamposModule",function(){return _});var A=this&&this.__decorate||function(t,e,i,o){var n,r=arguments.length,a=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(a=(r<3?n(a):r>3?n(e,i,a):n(e,i))||a);return r>3&&a&&Object.defineProperty(e,i,a),a},_=function(){function t(){}return t=A([Object(o.NgModule)({imports:[n.CommonModule,r.FormsModule,r.ReactiveFormsModule,g,v.a,y.NgxDatatableModule,x.DxDataGridModule,x.DxButtonModule,x.DxListModule,x.DxSelectBoxModule,w,d.SimpleNotificationsModule.forRoot()],providers:[{provide:k.a,useClass:I.a,multi:!0}],declarations:[f]})],t)}()}});