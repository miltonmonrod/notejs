import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from "./AppSettings";
@Injectable()
export class RolesService {
    public url: string;
    constructor(private http: HttpClient) { 
        this.url = AppSettings.Url;
    }
    getVentas(): Observable<any> {
        return this.http.get(this.url + 'api/Roles');
    }
    
}