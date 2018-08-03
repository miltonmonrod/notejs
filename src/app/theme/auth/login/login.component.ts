import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './shared/authentication.service';
import { StorageService } from '../../../core/services/storage.service';
import { LoginObject } from './shared/login-object.model';
import { Session } from '../../../core/models/session.model';




@Component({
  selector: 'app-basic-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public submitted: Boolean = false;
  public error: { code: number, message: string } = null;
  public _loginForm: LoginObject;
  constructor(
    private authenticationService: AuthenticationService,
    private storageService: StorageService,
    private _router: Router) {
    this._loginForm = new LoginObject("", "",false);
  }

  ngOnInit() {

  }
  onLogin() {

    this.submitted = true;
    this.error = null;
    this.authenticationService.login(this._loginForm).subscribe(
      data => { this.correctLogin(data) },
      error => { this.error = error._body }
    )    
  }
  private correctLogin(data: Session) {
    this.storageService.setCurrentSession(data);
    this._router.navigate(['dashboard']);
  }
}
