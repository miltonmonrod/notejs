import { Component, OnInit, AfterViewInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ContratoService } from '../../services/contrato.service';
import { StorageService } from '../../core/services/storage.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-contratos',
    templateUrl: './inicio.component.html',
    styleUrls: [
        './inicio.component.scss',
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

export class InicioComponent implements OnInit, AfterViewInit {
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
    

    constructor(private parametricasService: ContratoService,
        public storageService: StorageService,
        private servicePNotify: NotificationsService,
        private router: Router) {
        
    }

    onSubmit(isValid) {
        this.router.navigate(['/dashboard'], { queryParams: { idsucursal: '1325', idestablecimiento: '885', idusuario: '441', email:'miltonmonrod@gmail.com'} });
    }

}