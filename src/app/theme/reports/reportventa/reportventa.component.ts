import { Component, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { UsuariosService } from '../../../services/usuario.service';
import { IOption } from 'ng-select';
import { AuthenticationService } from '../../auth/login/shared/authentication.service';
import { StorageService } from '../../../core/services/storage.service';
import { NotificationsService } from 'angular2-notifications';
import { ConcesionariosService } from '../../../services/concesionario.service';
import { User } from '../../../core/models/user.model';
import { VentasService } from '../../../services/ventas.service';
import { RequestFilters } from '../../../models/venta.model';

declare const AmCharts: any;
@Component({
  selector: 'app-reportventa',
  templateUrl: './reportventa.component.html',
  styleUrls: ['./reportventa.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translate(0)' }),
        animate('400ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ],
  providers: [UsuariosService, ConcesionariosService, VentasService]
})
export class ReportVentaComponent implements OnInit {
  segmentosOptions: Array<IOption>;
  marcasOptions: Array<IOption>;
  concesionariosOptions: Array<IOption>;
  anioOptions: Array<IOption>;
  mesOptions: Array<IOption>;
  public error: any;
  options: any = {
    position: ['bottom', 'right'],
  };
  satisfaccionGeneralArray: Array<any>;
  satisfaccionPorcentajeArray: Array<any>;
  satisfaccionRetornoArray: Array<any>;
  satisfaccionRecomendacionArray: Array<any>;
  satisfaccionAtencionArray: Array<any>;
  satisfaccionDiasArray: Array<any>;
  satisfaccionRetornoRazonArray: Array<any>;
  satisfaccionSatisfechoRazonArray: Array<any>;
  satisfaccionNeutroRazonArray: Array<any>;
  satisfaccionInsatisfechoRazonArray: Array<any>;
  
  public selectedFilters: RequestFilters;
  constructor(private usuarioService: UsuariosService,
    public authenticationService: AuthenticationService,
    public storageService: StorageService,
    private servicePNotify: NotificationsService,
    private concesionarioService: ConcesionariosService,
    private ventasService: VentasService
  ) {
    this.selectedFilters = new RequestFilters('TOTAL', 'TOTAL', 'TOTAL', 'TOTAL', 'TOTAL', '0', '0');
    this.satisfaccionGeneralArray = [];
    this.satisfaccionPorcentajeArray = [];
    this.satisfaccionRetornoArray = [];
    this.satisfaccionRecomendacionArray = [];
    this.satisfaccionAtencionArray = [];
    this.satisfaccionDiasArray = [];
    this.satisfaccionRetornoRazonArray = [];
    this.satisfaccionSatisfechoRazonArray = [];
    this.satisfaccionNeutroRazonArray= [];
    this.satisfaccionInsatisfechoRazonArray = [];
  }

  ngOnInit() {
    this.options = {
      position: ['bottom', 'right'],
      maxStack: 8,
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      lastOnBottom: true,
      clickToClose: true,
      preventDuplicates: false,
      preventLastDuplicates: false,
      theClass: 'bg-c-pink no-icon',
      rtl: false,
      animate: 'rotate'
    };
    this.getContactabilidad();
    this.getContactos();
    this.getSegmentos();
    this.getMarcas();
    this.getConcesionarios();
    this.getAnio();
    this.getMes();

    setTimeout(() => { this.getSatisfaccionGeneral() }, 2500);
    //this.loadChart();
  }
  getConcesionarios() {
    debugger
    let user: any = this.storageService.getCurrentUser();
    let _user: User = JSON.parse(user);
    if (_user.UsuarioRolID === 'admin') {
      this.usuarioService.getConcesionarios().subscribe(
        result => {
          this.concesionariosOptions = result;

        },
        error => {
          this.error = error;
          if (this.error.statusText === 'Unauthorized') {
            this.servicePNotify.error('Derco App', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            this.authenticationService.logout().subscribe(response => { });
            this.storageService.logout();
          }
          console.log(<any>error);
        }
      )
    } else {
      this.usuarioService.getConcesionariosUser(_user.UsuarioID).subscribe(
        result => {
           
          this.concesionariosOptions = result;

        },
        error => {
          this.error = error;
          if (this.error.statusText === 'Unauthorized') {
            this.servicePNotify.error('Derco App', 'Se perdio la sesión, por favor loguearse de nuevo', '');
            this.authenticationService.logout().subscribe(response => { });
            this.storageService.logout();
          }
          console.log(<any>error);
        }
      )
    }
  }
  getAnio() {
    this.usuarioService.getAnio().subscribe(
      result => {
        this.anioOptions = result;

      },
      error => {
        this.error = error;
        if (this.error.statusText === 'Unauthorized') {
          this.servicePNotify.error('Derco App', 'Se perdio la sesión, por favor loguearse de nuevo', '');
          this.authenticationService.logout().subscribe(response => { });
          this.storageService.logout();
        }
        console.log(<any>error);
      }
    )

  }
  getMes() {
    this.usuarioService.getMes().subscribe(
      result => {
        this.mesOptions = result;

      },
      error => {
        this.error = error;
        if (this.error.statusText === 'Unauthorized') {
          this.servicePNotify.error('Derco App', 'Se perdio la sesión, por favor loguearse de nuevo', '');
          this.authenticationService.logout().subscribe(response => { });
          this.storageService.logout();
        }
        console.log(<any>error);
      }
    )

  }
  getSatisfaccionGeneral() {
    this.satisfaccionGeneralArray = [];
    this.ventasService.getSatisfaccionGeneralVentas(this.selectedFilters).subscribe(
      result => {
        this.satisfaccionGeneralArray = result;
        this.getSatisfaccionPorcentaje();
        //this.loadChart();
      },
      error => {
        this.error = error;
        if (this.error.statusText === 'Unauthorized') {
          this.servicePNotify.error('Derco App', 'Se perdio la sesión, por favor loguearse de nuevo', '');
          this.authenticationService.logout().subscribe(response => { });
          this.storageService.logout();
        }
        console.log(<any>error);
      }
    )

  }
  getSatisfaccionPorcentaje() {
    this.satisfaccionPorcentajeArray = [];
    this.ventasService.getSatisfaccionPorcentajeVentas(this.selectedFilters).subscribe(
      result => {
        this.satisfaccionPorcentajeArray = result;
        this.getSatisfaccionRetorno();
      },
      error => {
        this.error = error;
        if (this.error.statusText === 'Unauthorized') {
          this.servicePNotify.error('Derco App', 'Se perdio la sesión, por favor loguearse de nuevo', '');
          this.authenticationService.logout().subscribe(response => { });
          this.storageService.logout();
        }
        console.log(<any>error);
      }
    )

  }
  getSatisfaccionRetorno() {

    this.satisfaccionRetornoArray = [];
    this.ventasService.getSatisfaccionRetornoVentas(this.selectedFilters).subscribe(
      result => {
        this.satisfaccionRetornoArray = result;
        this.getSatisfaccionRecomendacion();
      },
      error => {
        this.error = error;
        if (this.error.statusText === 'Unauthorized') {
          this.servicePNotify.error('Derco App', 'Se perdio la sesión, por favor loguearse de nuevo', '');
          this.authenticationService.logout().subscribe(response => { });
          this.storageService.logout();
        }
        console.log(<any>error);
      }
    )

  }
  getSatisfaccionRecomendacion() {

    this.satisfaccionRecomendacionArray = [];
    this.ventasService.getSatisfaccionRecomendacionVentas(this.selectedFilters).subscribe(
      result => {
         
        this.satisfaccionRecomendacionArray = result;
        this.getSatisfaccionAtencion();
      },
      error => {
        this.error = error;
        if (this.error.statusText === 'Unauthorized') {
          this.servicePNotify.error('Derco App', 'Se perdio la sesión, por favor loguearse de nuevo', '');
          this.authenticationService.logout().subscribe(response => { });
          this.storageService.logout();
        }
        console.log(<any>error);
      }
    )

  }

  getSatisfaccionAtencion() {
    this.satisfaccionAtencionArray = [];
    this.ventasService.getSatisfaccionAtencionVentas(this.selectedFilters).subscribe(
      result => {
         
        this.satisfaccionAtencionArray = result;
        this.getSatisfaccionDias();
      },
      error => {
        this.error = error;
        if (this.error.statusText === 'Unauthorized') {
          this.servicePNotify.error('Derco App', 'Se perdio la sesión, por favor loguearse de nuevo', '');
          this.authenticationService.logout().subscribe(response => { });
          this.storageService.logout();
        }
        console.log(<any>error);
      }
    )
  }
  getSatisfaccionDias() {
    this.satisfaccionDiasArray = [];
    this.ventasService.getSatisfaccionDiasVentas(this.selectedFilters).subscribe(
      result => {
         
        this.satisfaccionDiasArray = result;
        this.getRazonRetorno();
      },
      error => {
        this.error = error;
        if (this.error.statusText === 'Unauthorized') {
          this.servicePNotify.error('Derco App', 'Se perdio la sesión, por favor loguearse de nuevo', '');
          this.authenticationService.logout().subscribe(response => { });
          this.storageService.logout();
        }
        console.log(<any>error);
      }
    )
  }
  getRazonRetorno() {
    this.satisfaccionRetornoRazonArray = [];
    this.ventasService.getRazonRetornoVentas(this.selectedFilters).subscribe(
      result => {
         
        this.satisfaccionRetornoRazonArray = result;
        this.getRazonSatisfechoRetorno();
      },
      error => {
        this.error = error;
        if (this.error.statusText === 'Unauthorized') {
          this.servicePNotify.error('Derco App', 'Se perdio la sesión, por favor loguearse de nuevo', '');
          this.authenticationService.logout().subscribe(response => { });
          this.storageService.logout();
        }
        console.log(<any>error);
      }
    )
  }

  getRazonSatisfechoRetorno() {
    this.satisfaccionSatisfechoRazonArray = [];
    this.ventasService.getRazonSatisfechoVentas(this.selectedFilters).subscribe(
      result => {
         
        this.satisfaccionSatisfechoRazonArray = result;
        this.getRazonNeutroRetorno();
      },
      error => {
        this.error = error;
        if (this.error.statusText === 'Unauthorized') {
          this.servicePNotify.error('Derco App', 'Se perdio la sesión, por favor loguearse de nuevo', '');
          this.authenticationService.logout().subscribe(response => { });
          this.storageService.logout();
        }
        console.log(<any>error);
      }
    )
  }
  getRazonNeutroRetorno() {
    this.satisfaccionNeutroRazonArray = [];
    this.ventasService.getRazonNeutroVentas(this.selectedFilters).subscribe(
      result => {
         
        this.satisfaccionNeutroRazonArray = result;
        this.getRazonInsatisfechoRetorno();
      },
      error => {
        this.error = error;
        if (this.error.statusText === 'Unauthorized') {
          this.servicePNotify.error('Derco App', 'Se perdio la sesión, por favor loguearse de nuevo', '');
          this.authenticationService.logout().subscribe(response => { });
          this.storageService.logout();
        }
        console.log(<any>error);
      }
    )
  }
  getRazonInsatisfechoRetorno() {
    this.satisfaccionInsatisfechoRazonArray = [];
    this.ventasService.getRazonInsatisfechoVentas(this.selectedFilters).subscribe(
      result => {
         
        this.satisfaccionInsatisfechoRazonArray = result;
        this.loadChart();
      },
      error => {
        this.error = error;
        if (this.error.statusText === 'Unauthorized') {
          this.servicePNotify.error('Derco App', 'Se perdio la sesión, por favor loguearse de nuevo', '');
          this.authenticationService.logout().subscribe(response => { });
          this.storageService.logout();
        }
        console.log(<any>error);
      }
    )
  }
  getSegmentos() {
    this.usuarioService.getSegmentos().subscribe(
      result => {
        this.segmentosOptions = result;

      },
      error => {
        this.error = error;
        if (this.error.statusText === 'Unauthorized') {
          this.servicePNotify.error('Derco App', 'Se perdio la sesión, por favor loguearse de nuevo', '');
          this.authenticationService.logout().subscribe(response => { });
          this.storageService.logout();
        }
        console.log(<any>error);
      }
    )

  }
  getMarcas() {
    this.usuarioService.getMarca().subscribe(
      result => {
        this.marcasOptions = result;

      },
      error => {
        this.error = error;
        if (this.error.statusText === 'Unauthorized') {
          this.servicePNotify.error('Derco App', 'Se perdio la sesión, por favor loguearse de nuevo', '');
          this.authenticationService.logout().subscribe(response => { });
          this.storageService.logout();
        }
        console.log(<any>error);
      }
    )

  }
  getContactabilidad() {
    this.usuarioService.getContactabilidad().subscribe(
      result => {
        this.selectedFilters.contactabilidad = result

      },
      error => {
        this.error = error;
        if (this.error.statusText === 'Unauthorized') {
          this.servicePNotify.error('Derco App', 'Se perdio la sesión, por favor loguearse de nuevo', '');
          this.authenticationService.logout().subscribe(response => { });
          this.storageService.logout();
        }
        console.log(<any>error);
      }
    )

  }
  getContactos() {
    this.usuarioService.getContactosValidos().subscribe(
      result => {
        this.selectedFilters.contactos = result;

      },
      error => {
        this.error = error;
        if (this.error.statusText === 'Unauthorized') {
          this.servicePNotify.error('Derco App', 'Se perdio la sesión, por favor loguearse de nuevo', '');
          this.authenticationService.logout().subscribe(response => { });
          this.storageService.logout();
        }
        console.log(<any>error);
      }
    )

  }
  loadChart() {
    AmCharts.makeChart("chartdiv", {
      "type": "serial",
      "theme": "light",
      "hideCredits": true,
      "marginRight": 0,
      "dataProvider": this.satisfaccionGeneralArray,
      "startDuration": 1,
      "graphs": [{
        "balloonText": "<b>[[category]]: [[value]]</b>",
        "fillColorsField": "color",
        "labelText": "[[value]]",
        "fillAlphas": 0.9,
        "lineAlpha": 0.1,
        "gridCount": 2,
        "type": "column",
        "valueField": "cantidad"
      }],
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      },
      "valueAxes": [{
        "boldLabels":true,        
        "axisAlpha": 0.2,
        "gridAlpha": 0.1

      }],
      "categoryField": "mes",
      "categoryAxis": {
        "gridPosition": "start",
        "axisAlpha": 0,
        "gridAlpha": 0,
        "position": "left"
      }
    });
    AmCharts.makeChart("chartdivporcentaje", {
      "type": "serial",
      "theme": "light",
      "hideCredits": true,
      "legend": {
        "align": "center",
        "autoMargins": false,       
        "marginLeft": 4,
        "marginRight":4,
        "borderAlpha": 0.2,
        "maxColumns": 3,
        "position": "bottom",
        "spacing": 1,
        "useGraphSettings": true,
        "markerSize": 7,
        "markerLabelGap": 2,
        "equalWidths": false,
        "valueWidth": 10,
        "valueText": "([[percents]]%)"

      },
      "dataProvider": this.satisfaccionPorcentajeArray,
      "startDuration": 1,
      "valueAxes": [{
        "stackType": "100%",
        "axisAlpha": 0.2,
        "gridAlpha": 0.1,
        "unit": "%",        
        "boldLabels":true,
        "labelsEnabled": true,
        "position": "left"

      }],
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      },
      "graphs": [{
        "valueAxis": "v1",
        "balloonText": "<b>[[title]]</b><br><span style='font-size:11px'>[[category]]: [[percents]]%</span>",
        "fillAlphas": 0.8,
        "labelText": "[[percents]]%",
        "fillColors": "#62FF33",
        "lineAlpha": 0.3,
        "fontSize": 8,
        "title": "Satisfecho",
        "type": "column",
        "color": "#000000",
        "valueField": "satisfecho"
      }, {
        "valueAxis": "v1",
        "balloonText": "<b>[[title]]</b><br><span style='font-size:11px'>[[category]]: [[percents]]%</span>",
        "fillAlphas": 0.8,
        "labelText": "[[percents]]%",
        "lineAlpha": 0.3,
        "fontSize": 8,
        "fillColors": "#F1E318",
        "title": "Neutral",
        "type": "column",
        "color": "#000000",
        "valueField": "neutral"
      }, {
        "valueAxis": "v1",
        "balloonText": "<b>[[title]]</b><br><span style='font-size:11px'>[[category]]: [[percents]]%</span>",
        "fillAlphas": 0.8,
        "labelText": "[[percents]]%",
        "fillColors": "#E91C12",
        "lineAlpha": 0.3,
        "fontSize": 8,
        "title": "Insatisfecho",
        "type": "column",
        "color": "#000000",
        "valueField": "insatisfecho"        
      },
      {
        "valueAxis": "v2",       
        "lineAlpha": 0,        
        "labelText": "[[value]]%",
        "bullet": "round",
        "bulletSize": 25,
        "fontSize": 8,
        "lineThickness": 5,
        "bulletColor": "#4099ff",        
        "bulletOffset":0,
        "visibleInLegend": false,
        "type": "line",       
        "labelPosition": "middle",                
        "color": "#fff",
        "showAllValueLabels":true,
        "showBalloon":false,        
        "valueField": "calculo"       
      }],
      "categoryField": "mes",
      "categoryAxis": {
        "gridPosition": "start",
        "axisAlpha": 0,
        "gridAlpha": 0,
        "position": "left"
      }
    });
    AmCharts.makeChart("chartdivrecomendacion", {
      "type": "serial",
      "theme": "light",
      "hideCredits": true,
      "legend": {
        "align": "center",
        "autoMargins": false,
        "marginLeft": 4,
        "marginRight":4,
        "borderAlpha": 0.2,
        "maxColumns": 3,
        "position": "bottom",
        "spacing": 0,
        "useGraphSettings": true,
        "markerSize": 7,
        "markerLabelGap": 2,
        "equalWidths": false,        
        "valueWidth": 10,
        "valueText": "([[percents]]%)"

      },
      "dataProvider": this.satisfaccionRecomendacionArray,
      "startDuration": 1,
      "valueAxes": [{
        "stackType": "100%",
        "axisAlpha": 0.2,
        "unit": "%",
        "gridAlpha": 0.1,
        "boldLabels":true,
        "labelsEnabled": true,
        "position": "left"

      }],
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      },
      "graphs": [{
        "valueAxis": "v1", 
        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: [[percents]]%</span>",
        "fillAlphas": 0.8,
        "labelText": "[[percents]]%",
        "lineAlpha": 0.3,
        "fontSize": 8,
        "fillColors": "#62FF33",
        "title": "Promotores",
        "type": "column",
        "color": "#000000",
        "valueField": "promotores"
      }, {
        "valueAxis": "v1", 
        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: [[percents]]%</span>",
        "fillAlphas": 0.8,
        "labelText": "[[percents]]%",
        "lineAlpha": 0.3,
        "fontSize": 8,
        "fillColors": "#F1E318",
        "title": "Pasivos",
        "type": "column",
        "color": "#000000",
        "valueField": "pasivos"
      }, {
        "valueAxis": "v1", 
        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: [[percents]]%</span>",
        "fillAlphas": 0.8,
        "labelText": "[[percents]]%",
        "lineAlpha": 0.3,
        "fontSize": 8,
        "fillColors": "#E91C12",
        "title": "Detractores",
        "type": "column",
        "color": "#000000",
        "valueField": "detractores"
      },{
        "valueAxis": "v2",       
        "lineAlpha": 0,        
        "labelText": "[[value]]%",
        "bullet": "round",
        "bulletSize": 25,
        "fontSize": 8,
        "lineThickness": 5,
        "bulletColor": "#4099ff",        
        "bulletOffset":0,
        "visibleInLegend": false,
        "type": "line",       
        "labelPosition": "middle",                
        "color": "#fff",
        "showAllValueLabels":true,
        "showBalloon":false,        
        "valueField": "calculo"       
      }],
      "categoryField": "mes",
      "categoryAxis": {
        "gridPosition": "start",
        "axisAlpha": 0,
        "gridAlpha": 0,
        "position": "left"
      }
    });
    AmCharts.makeChart("chartdivatencion", {
      "type": "serial",
      "theme": "light",
      "hideCredits": true,
      "legend": {
        "align": "center",
        "autoMargins": false,
        "borderAlpha": 0.2,
        "maxColumns": 3,
        "position": "bottom",
        "spacing": 1,
        "useGraphSettings": true,
        "markerSize": 7,
        "markerLabelGap": 2,
        "equalWidths": false,
        "valueWidth": 1,
        "valueText": "([[percents]]%)"

      },
      "dataProvider": this.satisfaccionAtencionArray,
      "startDuration": 1,
      "valueAxes": [{
        "stackType": "100%",
        "axisAlpha": 0.2,
        "gridAlpha": 0.1,
        "unit": "%",
        "labelsEnabled": true,
        "boldLabels":true,
        "position": "left"

      }],
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      },
      "graphs": [{
        "balloonText": "<b>[[title]]</b><br><span style='font-size:11px'>[[category]]: [[percents]]%</span>",
        "fillAlphas": 0.8,
        "labelText": "[[percents]]%",
        "fillColors": "#082181",
        "lineAlpha": 0.3,
        "fontSize": 8,
        "title": "TTB",
        "type": "column",
        "color": "#000000",
        "valueField": "ttb"
      }, {
        "balloonText": "<b>[[title]]</b><br><span style='font-size:11px'>[[category]]: [[percents]]%</span>",
        "fillAlphas": 0.8,
        "labelText": "[[percents]]%",
        "lineAlpha": 0.3,
        "fontSize": 8,
        "fillColors": "#2556CA",
        "title": "MB",
        "type": "column",
        "color": "#000000",
        "valueField": "mb"
      }, {
        "balloonText": "<b>[[title]]</b><br><span style='font-size:11px'>[[category]]: [[percents]]%</span>",
        "fillAlphas": 0.8,
        "labelText": "[[percents]]%",
        "fillColors": "#0D90E3",
        "lineAlpha": 0.3,
        "fontSize": 8,
        "title": "BTB",
        "type": "column",
        "color": "#000000",
        "valueField": "btb"
      }],
      "categoryField": "mes",
      "categoryAxis": {
        "gridPosition": "start",
        "axisAlpha": 0,
        "gridAlpha": 0,
        "position": "left"
      }
    });
    AmCharts.makeChart("chartdivretorno", {
      "type": "serial",
      "theme": "light",
      "hideCredits": true,
      "legend": {
        "align": "center",
        "autoMargins": false,
        "borderAlpha": 0.2,
        "maxColumns": 3,
        "position": "bottom",
        "spacing": 1,
        "useGraphSettings": true,
        "markerSize": 7,
        "markerLabelGap": 2,
        "equalWidths": false,
        "valueWidth": 1,
        "valueText": "([[percents]]%)"

      },
      "dataProvider": this.satisfaccionRetornoArray,
      "startDuration": 1,
      "valueAxes": [{
        "stackType": "100%",
        "axisAlpha": 0.3,
        "gridAlpha": 0.1,
        "unit": "%",
        "boldLabels":true,
        "labelsEnabled": true,
      }],
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      },
      "graphs": [{
        "valueAxis": "v1",
        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: [[percents]]%</span>",
        "fillAlphas": 0.8,
        "labelText": "[[percents]]%",
        "lineAlpha": 0.3,
        "fontSize": 8,
        "fillColors": "#F95D05",
        "title": "SI",
        "type": "column",
        "color": "#000000",
        "valueField": "si"
      }, {
        "valueAxis": "v1", 
        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: [[percents]]%</span>",
        "fillAlphas": 0.8,
        "labelText": "[[percents]]%",
        "lineAlpha": 0.3,
        "fontSize": 8,
        "fillColors": "#818586",
        "title": "NO",
        "type": "column",
        "color": "#000000",
        "valueField": "no"
      },{
        "valueAxis": "v2",       
        "lineAlpha": 0,        
        "labelText": "[[value]]%",
        "bullet": "round",
        "bulletSize": 25,
        "fontSize": 8,
        "lineThickness": 5,
        "bulletColor": "#4099ff",        
        "bulletOffset":0,
        "visibleInLegend": false,
        "type": "line",       
        "labelPosition": "middle",                
        "color": "#fff",
        "showAllValueLabels":true,
        "showBalloon":false,        
        "valueField": "calculo"       
      }],
      "categoryField": "mes",
      "categoryAxis": {
        "gridPosition": "start",
        "axisAlpha": 0,
        "gridAlpha": 0,
        "position": "left"
      }
    });
    AmCharts.makeChart("chartdivline", {
      "type": "serial",
      "theme": "light",
      "hideCredits": true,
      "marginRight": 80,
      "marginTop": 17,
      "autoMarginOffset": 20,
      "dataProvider": this.satisfaccionDiasArray,
      "valueAxes": [{
        "axisAlpha": 0.2,
        "dashLength": 4,
        "boldLabels":true,
        "position": "left"
      }],
      "mouseWheelZoomEnabled": true,
      "graphs": [{
        "id": "g1",
        "balloonText": "<b>Promedio</b> <br/> [[value]]",
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "bulletSize": 12,
        "bulletColor": "#FFFFFF",
        "hideBulletsCount": 50,
        "title": "Promedio",
        "valueField": "promedio",
        "useLineColorForBulletBorder": true,
        "balloon": {
          "drop": true
        }
      }],
      "chartScrollbar": {
        "autoGridCount": true,
        "graph": "g1",
        "scrollbarHeight": 40
      },
      "chartCursor": {
        "limitToGraph": "g1"
      },
      "categoryField": "mes",
      "categoryAxis": {
        "parseDates": false,
        "axisColor": "#DADADA",
        "dashLength": 2,
        "minorGridEnabled": true
      },
      "pathToImages": "assets/amcharts/images/"
    });
    var chart = AmCharts.makeChart("chartdivmotivos", {
      "theme": "light",
      "type": "serial",
      "hideCredits": true,
      "dataProvider": this.satisfaccionRetornoRazonArray,
      "startDuration": 1, 
      "valueAxes": [{
       // "stackType": "100%",
        "axisAlpha": 0.2,
        "gridAlpha": 0.1,
        "position": "top",
        "unit": "%",
        "boldLabels":true,
        "labelsEnabled": true,

      }],    
      "graphs": [{
        "balloonText": "Razon: [[category]]:[[value]]%",
        "fillAlphas": 1,
        "fillColorsField": "color",
        "lineAlpha": 0.3,
        "type": "column",
        "valueField": "cantidad",
        "labelText": "[[value]]%",        
        "fontSize": 8,
        "title": "Satisfecho",       
        "color": "#000000"
        
        }],

      "rotate": true,
      "categoryField": "variable",
      "categoryAxis": {
        "gridPosition": "start",
        "fillAlpha": 0.05,
        "position": "left",
        "labelsEnabled" : false
      }
    });
    AmCharts.makeChart("chartdivsatisfaccion1", {
      "theme": "light",
      "type": "serial",
      "hideCredits": true,
      "dataProvider": this.satisfaccionSatisfechoRazonArray,
      "startDuration": 1, 
      "valueAxes": [{
       // "stackType": "100%",
        "axisAlpha": 0.2,
        "gridAlpha": 0.1,
        "unit": "%",
        "boldLabels":true,
        "labelsEnabled": true,
        "position": "top"

      }],    
      "graphs": [{
        "balloonText": "Razon: [[category]]:[[value]]%",
        "fillAlphas": 1,
        "fillColorsField": "color",
        "lineAlpha": 0.3,
        "type": "column",
        "valueField": "cantidad",
        "labelText": "[[value]]%",        
        "fontSize": 8,
        "title": "Satisfecho",       
        "color": "#000000"
        
        }],

      "rotate": true,
      "categoryField": "variable",
      "categoryAxis": {
        "gridPosition": "start",
        "fillAlpha": 0.05,
        "position": "left",
        "labelsEnabled" : false
      }
    });
    AmCharts.makeChart("chartdivsatisfaccion2", {
      "theme": "light",
      "type": "serial",
      "hideCredits": true,
      "dataProvider": this.satisfaccionNeutroRazonArray,
      "startDuration": 1, 
      "valueAxes": [{
       // "stackType": "100%",
        "axisAlpha": 0.2,
        "gridAlpha": 0.1,
        "unit": "%",
        "boldLabels":true,
        "labelsEnabled": true,
        "position": "top"

      }],    
      "graphs": [{
        "balloonText": "Razon: [[category]]:[[value]]%",
        "fillAlphas": 1,
        "fillColorsField": "color",
        "lineAlpha": 0.3,
        "type": "column",
        "valueField": "cantidad",
        "labelText": "[[value]]%",        
        "fontSize": 8,
        "title": "Satisfecho",       
        "color": "#000000"
        
        }],

      "rotate": true,
      "categoryField": "variable",
      "categoryAxis": {
        "gridPosition": "start",
        "fillAlpha": 0.05,
        "position": "left",
        "labelsEnabled" : false
      }
    });
    AmCharts.makeChart("chartdivsatisfaccion3", {
      "theme": "light",
      "type": "serial",
      "hideCredits": true,
      "dataProvider": this.satisfaccionInsatisfechoRazonArray,
      "startDuration": 1, 
      "valueAxes": [{
       // "stackType": "100%",
        "axisAlpha": 0.2,
        "gridAlpha": 0.1,
        "boldLabels":true,
        "unit": "%",
        "labelsEnabled": true,
        "position": "top"

      }],    
      "graphs": [{
        "balloonText": "Razon: [[category]]:[[value]]%",
        "fillAlphas": 1,
        "fillColorsField": "color",
        "lineAlpha": 0.3,
        "type": "column",
        "valueField": "cantidad",
        "labelText": "[[value]]%",        
        "fontSize": 8,
        "title": "Satisfecho",       
        "color": "#000000"
        
        }],

      "rotate": true,
      "categoryField": "variable",
      "categoryAxis": {
        "gridPosition": "start",
        "fillAlpha": 0.05,
        "position": "left",
        "labelsEnabled" : false
      }
    });
  }


}
