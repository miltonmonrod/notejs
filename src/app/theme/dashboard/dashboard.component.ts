import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../core/services/storage.service';
import { Session } from '../../core/models/session.model';
import { KeycloakService } from 'keycloak-angular';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss'
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
  ]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  session: Session;
  options: any = {
    position: ['bottom', 'right'],
  };

  constructor(private servicePNotify: NotificationsService, private route: ActivatedRoute, private storageService: StorageService, private keycloakService: KeycloakService ) {
  }

  async ngOnInit() {
    var ses = this.storageService.getCurrentSession();
    
    let header = new HttpHeaders();
    console.log('Aut:' + header.get('Authorization')) 
    //alert('llego:' + this.route.snapshot.queryParamMap.get('idsucursal'))
    if (ses === null) {
      const idsucursal: string = this.route.snapshot.queryParamMap.get('idsucursal');
      const idusuario: string = this.route.snapshot.queryParamMap.get('idusuario');
      const idestablecimiento: string = this.route.snapshot.queryParamMap.get('idestablecimiento');
      const email: string = this.route.snapshot.queryParamMap.get('email');
      if (idsucursal != null && idusuario != null && idestablecimiento != null && email != null) {
        this.session = {
          idsucursal: parseInt(idsucursal),
          idestablecimiento: parseInt(idestablecimiento),
          idusuario: parseInt(idusuario),
          email: email,
          idtipoproducto: null
        }
        this.storageService.setCurrentSession(this.session);
      }
      else {
        console.log('called without parameters, exit');
        await this.keycloakService.logout();
      }
    }
    else 
      console.log(this.storageService.getCurrentSession().idusuario);
  }

  ngAfterViewInit() {
    setTimeout(() => {
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
    this.servicePNotify.html(
        '<h4>Bienvenido!!</h4> <p>En este panel encontrará información estadistica para su gestión.</p>',
        'success'
      );
    }, 75);
  }

}