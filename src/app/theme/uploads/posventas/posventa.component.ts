import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { PosVentasService } from '../../../services/posventa.service';
import { AuthenticationService } from '../../auth/login/shared/authentication.service';
import { StorageService } from '../../../core/services/storage.service';
import { NotificationsService } from 'angular2-notifications';
import { AppSettings } from '../../../services/AppSettings';
import { User } from '../../../core/models/user.model';
@Component({
  selector: 'app-posventa',
  templateUrl: './posventa.component.html',
  styleUrls: ['./posventa.component.scss' ,
              '../../../../assets/icon/icofont/css/icofont.scss'
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
providers: [PosVentasService],
encapsulation: ViewEncapsulation.None
})
export class PosVentaComponent implements OnInit {
  public rowPosVentas = [];
  public error: any;
  public usuario:User;
  value: any[] = [];
  options: any = {
    position: ['top', 'right']
  };
  position1 = 'bottom';
  position2 = 'right';
  timeOut = 1000;
  showProgressBar = true;
  pauseOnHover = true;
  lastOnBottom = true;
  clickToClose = true;
  maxLength = 0;
  maxStack = 8;
  preventDuplicates = false;
  preventLastDuplicates = false;
  theClass: string;
  rtl = false;
  animate = 'fromRight';
  icons: string;
  subType = 'success';
  msg: string;
  title: string;
  public url;
  constructor(
    public ventasServices: PosVentasService,
    public authenticationService: AuthenticationService,
    public storageService: StorageService,
    public servicePNotify: NotificationsService) {
    this.rowPosVentas = [];
    this.url = AppSettings.Url + "api/DocumentUpload/PosVentaPost";
    this.usuario = new User();
  }

  ngOnInit() {
    this.getUsuario();
    setTimeout(() => {
      this.getListaVentas()
    }, 3);    
  }
  subidaCompleta(e) {

    if (e.request.status == 201) {
      this.getListaVentas();
      setTimeout(() => { this.servicePNotify.html(
        '<h4>Subida de datos</h4><p>Los datos se han subido correctamente!</p>',
        'info'
      ); }, 15);
    } else {
      setTimeout(() => { this.servicePNotify.error('Subida de datos', 'Error al subir los datos', '') }, 15);
    };
  }
  getListaVentas() {
    this.ventasServices.getVentas().subscribe(
      result => {
         
        this.rowPosVentas = result;
        console.log(result);
      },
      error => {
        this.error = error;
        if (error.statusText === 'Unauthorized') {
          this.servicePNotify.error('Derco App', 'Se perdio la sesión, por favor loguearse de nuevo', '');
          this.authenticationService.logout().subscribe(response => { });
          this.storageService.logout();
        }
        console.log(<any>error);
      }
    )

  }
  getUsuario() {
    debugger
    let user: any = this.storageService.getCurrentUser();
    this.usuario = JSON.parse(user);
    
  }

}
