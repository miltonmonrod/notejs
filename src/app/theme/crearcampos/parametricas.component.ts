import { Component, OnInit, AfterViewInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ContratoService } from '../../services/contrato.service';
import { PaConfigcamposreporte } from '../../models/PaConfigcamposreporte';
import { StorageService } from '../../core/services/storage.service';
import { NotificationsService } from 'angular2-notifications';
@Component({
    selector: 'app-contratos',
    templateUrl: './parametricas.component.html',
    styleUrls: [
        './parametricas.component.scss',
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

export class ParametricasComponent implements OnInit, AfterViewInit {
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
        this.getConfigCampos();
    }

    //variables
    public displayLista: boolean;
    public displayCrear: boolean;
    public ListaFormato: Array<any>;
    public ListaTipoCampo: Array<any>;
    public ListaValores: Array<any>;
    public ListaObli: Array<any>;
    public ListaValidaciones: Array<any>;
    public ListaEstado: Array<any>;
    public class_codtipoformato: boolean;
    public class_codtipocampo: boolean;
    public class_codlistavalores: boolean;
    public class_indobligatoriedad: boolean;
    public class_estado: boolean;
    public class_destinovalidacion: boolean;
    public class_codtipovalidacion: boolean;

    public error: any;
    //Listas
    public njLista: Array<PaConfigcamposreporte>;
    //Objetos CRUD's
    public campo: PaConfigcamposreporte;
    //Fin Objetos CRUD's
    public operacionConfCampos = 'C';
    
    options: any = {
        position: ['bottom', 'right']
    };
    
    constructor( private parametricasService: ContratoService, public storageService: StorageService, private servicePNotify: NotificationsService) {
        
        this.inicializarModelo();

        this.displayLista = true;
        this.displayCrear = false;
        
        this.ListaFormato = [
            { Id: null, Nombre: "-- Seleccione un tipo formato --" },
            { Id: 4948, Nombre: "Alfanumérico" },
            { Id: 4949, Nombre: "Fecha (dd/mm/aaaa)" },
            { Id: 4950, Nombre: "Numérico" },
        ];

        this.ListaTipoCampo = [
            { Id: "", Nombre: "-- Seleccione un tipo de campo --" },
            { Id: "1", Nombre: "Campo abierto" },
            { Id: "2", Nombre: "Lista de selección única" },
        ];

        this.ListaValores = [
            { Id: null, Nombre: "-- Seleccione una lista de valores --" },
            { Id: 230, Nombre: "Describe las condiciones de almacenamiento que deben seguir algunos Alimentos" },
            { Id: 231, Nombre: "Lista las entidades que en Colombia otorgan la Certificación HACCP" },
            { Id: 233, Nombre: "Lista de respuesta simple" },
        ];

        this.ListaObli = [
            { Id: '', Nombre: "-- Seleccione una opción --" },
            { Id: 'S', Nombre: "SI" },
            { Id: 'N', Nombre: "NO" },
        ];

        this.ListaEstado = [
            { Id: '', Nombre: "-- Seleccione el estado --" },
            { Id: 'A', Nombre: "Activo" },
            { Id: 'I', Nombre: "Inactivo" },
        ];

        this.ListaValidaciones = [
            { Id: null, Nombre: "-- Seleccione un servicio para validar el campo a ingresar --" },
            { Id: 4951, Nombre: "Microservicio existe registro sanitario INVIMA" },
        ];
    }

    //Configurar campos
    getConfigCampos() {
        this.parametricasService.getAllConfCampos().subscribe(
            result => {
                this.njLista = result;
            },
            error => {
                this.error = error;
                if (error.statusText === 'Unauthorized') {
                    this.servicePNotify.error('TRAZA', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                    this.storageService.logout();
                }
                console.log(<any>error);
            }
        )
    }
    onSubmit(isValid) {
        debugger;
        //Validar listas
        this.class_codtipoformato = this.campo.codtipoformato === null;
        this.class_codtipocampo = this.campo.codtipocampo === '';
        this.class_codlistavalores = this.campo.codlistavalores === null;
        this.class_indobligatoriedad = this.campo.indobligatoriedad ==='';
        this.class_estado = this.campo.estado === '';
        this.class_destinovalidacion = this.campo.destinovalidacion === '';
        this.class_codtipovalidacion = this.campo.codtipovalidacion === null;
        if (isValid &&
            !this.class_codtipoformato &&
            !this.class_codtipocampo &&
            !(this.class_codlistavalores && this.campo.codtipocampo === '2') &&
            !this.class_indobligatoriedad &&
            !this.class_estado &&
            !this.class_destinovalidacion &&
            !(this.class_codtipovalidacion && this.campo.destinovalidacion === 'S')
        ) {
            if (this.operacionConfCampos === 'C') {
                this.parametricasService.addConfCampos(this.campo).subscribe(
                    result => {
                        debugger;
                        if (result.operacionExitosa) {
                            this.servicePNotify.html(
                                '<h4>Guardado de datos</h4><p>Los datos se han guardado correctamente!</p>',
                                'info'
                            );
                            this.inicializarModelo();
                        } else {
                            this.servicePNotify.html(
                                '<h4>Error al salvar los datos <p>' + result.mensaje + '</p></h4>',
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
            else if (this.operacionConfCampos === 'U') {
                this.parametricasService.updateConfCampos(this.campo).subscribe(
                    result => {
                        if (result.operacionExitosa) {
                            this.servicePNotify.html(
                                '<h4>Guardado de datos</h4><p>Los datos se han editado correctamente!</p>',
                                'info'
                            );
                            this.showPanel('V');
                        } else {
                            this.servicePNotify.html(
                                '<h4>Error al salvar los datos <p>' + result.mensaje + '</p></h4>',
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
        }
    }
    cargarEditCampo(id) {
        this.operacionConfCampos = 'U';
        this.parametricasService.getConfCampoById(id).subscribe(
            result => {
                this.campo = result;
                this.displayLista = false;
                this.displayCrear = true;
            },
            error => {
                this.error = error;
                if (error.statusText === 'Unauthorized') {
                    this.servicePNotify.error('TRAZA', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                    this.storageService.logout();
                }
                console.log(<any>error);
            }
        )
    }
    showPanel(sw) {
        if (sw === 'C') {//Crear
            this.displayLista = false;
            this.displayCrear = true;
            this.inicializarModelo();
        }
        else if (sw === 'V') {//Volver al listado de contratistas
            this.displayLista = true;
            this.displayCrear = false;
            this.inicializarModelo();
            //recargar la tabla
            this.getConfigCampos();
        }
    }
    inicializarModelo() {
        this.campo = {
            idconfigcamposreporte: 0,
            nombrecampo: "",
            codtipoformato: null,
            codtipocampo: "",
            nombretipoformato: "",
            longitud: null,
            nombretipovalidacion: "",
            codtipovalidacion: null,
            destinovalidacion: "",
            indobligatoriedad: "",
            nombrelistavalores: "",
            codlistavalores: null,
            nombreestado: "",
            estado: "",
            fechacreacion: null,
            fechacreacionformat: "",
            usuariocreacion: "",
            fechamodificacion: null,
            fechamodificacionformat:"",
            usuariomodificacion: "",
            fechainivigencia: new Date(),
            fechafinvigencia: null
        };
        this.class_codtipoformato = false;
        this.class_codtipocampo = false;
        this.class_codlistavalores = false;
        this.class_indobligatoriedad = false;
        this.class_estado = false;
        this.class_destinovalidacion = false;
        this.class_codtipovalidacion = false;
        this.operacionConfCampos = 'C';
    }
    //Fin configurar campos
}