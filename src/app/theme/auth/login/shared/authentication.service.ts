import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {LoginObject} from "./login-object.model";
import { AppSettings } from "../../../../services/AppSettings";


@Injectable()
export class AuthenticationService {
    private url;
  constructor(private http: HttpClient) {
    this.url= AppSettings.Url;
  }
   
    login(loginObj: LoginObject): Observable<any> {
        let json = loginObj;
        let params = "grant_type=password&username="+json.username+"&password="+json.password;
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded'); 
                 
        return this.http.post(this.url+'token', params, {headers: headers});
    }
    logout(): Observable<any> {
        return this.http.post(this.url + 'api/logout',null, {});
    }    
}