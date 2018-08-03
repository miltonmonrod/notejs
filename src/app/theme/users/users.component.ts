import { Component, OnInit, AfterViewInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { UsuariosService } from '../../services/usuario.service';
import { DxDataGridModule } from 'devextreme-angular';
import { User } from '../../core/models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { IOption } from 'ng-select';
import { AuthenticationService } from '../auth/login/shared/authentication.service';
import { StorageService } from '../../core/services/storage.service';
import { NotificationsService } from 'angular2-notifications';
import { Concesionario } from '../../models/concesionario.model';
import { Usuario } from '../../models/usuario.model';
import { ConcesionariosService } from '../../services/concesionario.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [
    './users.component.scss',
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
  providers: [UsuariosService, ConcesionariosService]
})
export class UsersComponent implements OnInit, AfterViewInit {
  userForm: FormGroup;
  submitted: boolean;
  public _usuario:User;
  editProfile = true;
  editProfileIcon = 'icofont-edit';

  editAbout = true;
  editAboutIcon = 'icofont-edit';

  public editor;
  public editorContent: string;

  public dataSource: any;
  public error: any;
  public optionsSelect: Array<any>;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  profitChartOption: any;
  public concesionario: Array<Concesionario>;
  public usuario: Usuario;
  rowsUsers: User[];
  loadingIndicator = true;
  reorderable = true;
  gridDataSource: any = {};
  concesionariosOption: Array<IOption>;
  selectedOptions: Array<string> = [];
  options: any = {
    position: ['bottom', 'right']
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
  constructor(
    private usuarioService: UsuariosService,
    public authenticationService: AuthenticationService,
    public storageService: StorageService,
    private servicePNotify: NotificationsService,
    private concesionarioService: ConcesionariosService) {
    this.usuario = new Usuario();
    this._usuario = new User();
    this.concesionario = new Array<Concesionario>();
    const nombreCompleto = new FormControl('', Validators.required);
    const email = new FormControl('', [Validators.required, Validators.email]);
    const password = new FormControl('', Validators.required);
    const rol = new FormControl('', Validators.required);
    const usuarioID = new FormControl(0);
    const rpassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);
    const concesionario = new FormControl('', Validators.required);
    this.userForm = new FormGroup({
      usuarioID: usuarioID,
      nombreCompleto: nombreCompleto,
      email: email,
      password: password,
      rpassword: rpassword,
      rol: rol,
      concesionario: concesionario,
    });
  }
  getPerfil(){
    debugger
    let user: any = this.storageService.getCurrentUser();
    this._usuario = JSON.parse(user);
  }
  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      result => {
        this.rowsUsers = result;
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
  getConcesionarios() {
    this.usuarioService.getConcesionarios().subscribe(
      result => {
        this.concesionariosOption = result;
        console.log(result);
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
  ngOnInit() {
    this.getPerfil();
    this.getUsuarios();
    this.getConcesionarios();
  }
  ngAfterViewInit() {
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
  onSubmit() {
     
    this.concesionario=[];
    this.submitted = true;
    this.usuario.usuarioID = this.userForm.value.usuarioID == null ? 0 : this.userForm.value.usuarioID;
    this.usuario.usuarioNombreCompleto = this.userForm.value.nombreCompleto;
    this.usuario.UsuarioPasword = this.userForm.value.password;
    this.usuario.usuarioEmail = this.userForm.value.email;
    this.usuario.usuarioRolID = this.userForm.value.rol;
    this.usuario.UsuarioHabilitado = true;
    this.usuarioService.addUsuario(this.usuario).subscribe(
      result => {
        this.servicePNotify.html(
          '<h4>Guardado de datos</h4><p>Los datos se han guardado correctamente!</p>',
          'info'
        );
        let _usuarioId = result.usuarioID;
        this.selectedOptions.forEach(element => {
          this.concesionario.push({ usuarioID: _usuarioId, concesionarioID: element, habilitado: true })
        });
        this.concesionarioService.addConcecionarios(this.concesionario).subscribe(
          result => { },
          error => { this.error = error }
        );
        this.getUsuarios();
        this.userForm.reset();
        this.selectedOptions = [];
        this.usuario = { usuarioID: 0, usuarioEmail: "", usuarioRolID: '', UsuarioHabilitado: true, UsuarioPasword: '', usuarioNombreCompleto: '', UsuarioAvatar: null };
      },
      error => {
        this.error = error;
        if (this.error.statusText === 'Unauthorized') {
          this.authenticationService.logout().subscribe(response => { });
          this.storageService.logout();
        }
        console.log(<any>error);
      })
  }
  toggleEditProfile() {
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;
  }
  toggleEditAbout() {
    this.editAboutIcon = (this.editAboutIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editAbout = !this.editAbout;
  }
  editClick(data) {
    this.userForm.reset();    
    this.userForm.setValue(
      {
        usuarioID: data.usuarioID,
        nombreCompleto: data.usuarioNombreCompleto,
        password: data.usuarioPasword,
        rpassword: data.usuarioPasword,
        email: data.usuarioEmail,
        rol: data.usuarioRolID,
        concesionario: ''
      });
      this.usuarioService.getConcesionariosUser(data.usuarioID).subscribe(
        result =>{
          this.selectedOptions = [];
          result.forEach(element => {
             
            let object:string = element.concesionarioID;           
            this.selectedOptions.push(object);
          });
        },
        error=>{
             this.error = error;
             console.log(this.error);
        }
      );
    console.log(data);
  }

  detailClick(data) {
    this.usuario.usuarioID = data.usuarioID;
    this.usuario.usuarioNombreCompleto = data.usuarioNombreCompleto;
    this.usuario.UsuarioPasword = data.usuarioPasword;
    this.usuario.usuarioEmail = data.usuarioEmail;
    this.usuario.usuarioRolID = data.usuarioRolID;
    this.usuarioService.getConcesionariosUser(data.usuarioID).subscribe(
      result =>{
        this.selectedOptions = [];
        result.forEach(element => {
           
          let object:string = element.concesionarioID;           
          this.selectedOptions.push(object);
        });
      },
      error=>{
           this.error = error;
           console.log(this.error);
      }
    );
    this.openMyModal('effect-13');
    console.log(data);
  }

  deleteClick(data) {
    this.usuarioService.deleteUser(data.usuarioID).subscribe(
      result =>{        
        this.servicePNotify.warn('Eliminar Usuarios','Datos eliminados correctamente!');
        this.getUsuarios();
      },
      error=>{
           this.error = error;
           console.log(this.error);
      }
    );
    console.log(data);
  }
  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    this.usuario.usuarioID = null;
    this.usuario.usuarioNombreCompleto = '';
    this.usuario.UsuarioPasword = '';
    this.usuario.usuarioEmail = '';
    this.usuario.usuarioRolID = '';
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

}
