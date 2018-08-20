import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ContratoService } from '../../services/contrato.service';
import { StorageService } from '../../core/services/storage.service';
import { NotificationsService } from 'angular2-notifications';
import { TrReporte } from "../../models/TrReporte";
import { AppSettings } from '../../services/AppSettings';
import { DxFileUploaderComponent } from 'devextreme-angular';
@Component({
    selector: 'app-contratos',
    templateUrl: './trazaxproducto.component.html',
    styleUrls: [
        './trazaxproducto.component.scss',
        '../../../assets/icon/icofont/css/icofont.scss'
    ],
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
    providers: [ContratoService]
})

export class TrazaXproductoComponent implements OnInit, AfterViewInit {
    ngAfterViewInit(): void {
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
    }
    ngOnInit(): void {

    }

    public error: any;
    public columnas: Array<any>;
    options: any = {
        position: ['bottom', 'right']
    };
    public class_aniovigencia: boolean;
    public class_mesvigencia: boolean;
    public reporte: TrReporte;
    public ListaVigencia: Array<any>;
    public ListaMeses: Array<any>;
    public url: string;
    public value: any[] = [];
    public texto:string;
    public msj:string;
    public msjCargue:string;
    
    @ViewChild(DxFileUploaderComponent) uploader:DxFileUploaderComponent;

    constructor(private parametricasService: ContratoService,
        public storageService: StorageService,
        private servicePNotify: NotificationsService) {
        this.inicializarModelo();

        this.ListaVigencia = [
            { Id: null, Nombre: "-- Seleccione una vigencia --" },
            { Id: 2018, Nombre: "2018" },
        ];

        this.ListaMeses = [
            { Id: null, Nombre: "-- Seleccione un mes --" },
            { Id: 1, Nombre: "Enero" },
            { Id: 2, Nombre: "Febrero" },
            { Id: 3, Nombre: "Marzo" },
            { Id: 4, Nombre: "Abril" },
            { Id: 5, Nombre: "Mayo" },
            { Id: 6, Nombre: "Junio" },
            { Id: 7, Nombre: "Julio" },
            { Id: 8, Nombre: "Agosto" },
            { Id: 9, Nombre: "Septiembre" },
            { Id: 10, Nombre: "Octubre" },
            { Id: 11, Nombre: "Noviembre" },
            { Id: 12, Nombre: "Diciembre" },
        ];

        this.url = AppSettings.Url_upload + "upload/report";
    }

    verArchivo() {
        this.parametricasService.getCsvByTipoReporteId(3).subscribe(
            result => {
                if (result.operacionExitosa) {
                    this.columnas = [];
                    this.columnas.push(result.columnas);
                    this.exportToCsv(result.nombreArchivo, this.columnas);
                } else {
                    this.servicePNotify.html(
                        '<h4>Error al consutruir el archivo <p>' + result.mensaje + '</p></h4>',
                        'error'
                    );
                }
            },
            error => {
                this.error = error;
                if (this.error.statusText === 'Unauthorized') {
                    this.storageService.logout();
                }
                console.log(<any>error);
            })

    }
    exportToCsv(filename, rows) {
        var processRow = function (row) {
            var finalVal = '';
            for (var j = 0; j < row.length; j++) {
                var innerValue = row[j] === null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                };
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';
                if (j > 0)
                    finalVal += ';';
                finalVal += result;
            }
            return finalVal + '\n';
        };

        var csvFile = '';
        for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }

        var blob = new Blob(["\ufeff", csvFile], { type: 'text/csv;charset=UTF-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }
    inicializarModelo() {
        this.reporte = {
            idreporte: 0,
            idtipoproducto: 1,
            aniovigencia: null,
            mesvigencia: null,
            idsucursal: 1325,
            idusuario: 441
        };
        this.class_aniovigencia = false;
        this.class_mesvigencia = false;
        this.msjCargue = "";
    }
    onSubmit(isValid) {
        this.class_aniovigencia = this.reporte.aniovigencia === null;
        this.class_mesvigencia = this.reporte.mesvigencia === null;
        if (isValid &&
            !this.class_aniovigencia &&
            !this.class_mesvigencia
        ){

        }
    }
    subidaCompleta(e) {
        if (e.request.response.split('|')[0] === 'Success') {
            //Mostrar el panel de cargado
            this.msjCargue = "Señor usuario su información ha sido recibida por el INVIMA, sus números de identificador son (" + e.request.response.split('|')[2] + "), los archivos serán validados y procesados, los resultados del proceso serán notificados a través del correo electrónico asociado al usuario autenticado."; 
            setTimeout(() => {
                this.servicePNotify.html(
                    '<h4>Subida de datos</h4><p>Los archivos se han subido correctamente!</p>',
                    'info'
                );
            }, 15);
        } else {
            this.msj = e.request.response.split('|')[1];
            this.msjCargue = "";
            this.texto = "";
            if(this.msj === 'EstructuraArc') {
                this.texto = "Los archivos no contiene la estructura de nombres establecida.";
            }
            else if(this.msj === 'YaExiste') {
                this.texto = "Ya existe un reporte para la sucursal, tipo producto, año y mes seleccionado.";
            }
            else if(this.msj === 'Ext') {
                this.texto = "El archivo a cargar debe ser un zip.";
            }
            else if(this.msj === 'Mes') {
                this.texto = "El mes a reportar ya se encuentra cerrado.";
            }
            else {
                this.texto = this.msj;
            }

            setTimeout(() => { this.servicePNotify.error('Subida de datos', this.texto) }, 25);
        };
        //reinicio el componente upload
        this.uploader.instance.reset();
    }
    addIdParameter (e) {
        this.url = AppSettings.Url_upload + "upload/report"
            + "?aniovigencia=" + this.reporte.aniovigencia 
            + "&mesvigencia=" + this.reporte.mesvigencia
            + "&idtipoproducto=" + this.reporte.idtipoproducto
            + "&idsucursal=" + this.reporte.idsucursal
            + "&idusuario=" + this.reporte.idusuario; 
    }
}