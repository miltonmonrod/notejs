import { Injectable } from "@angular/core";
import { Session } from "../models/session.model";

@Injectable()
export class StorageService {

    private localStorageService;
    private currentSession: Session = null;
    private currentRoles: any;

    constructor() {
        this.localStorageService = localStorage;
        this.currentSession = this.loadSessionData();
    }

    setCurrentSession(session: Session): void {
        this.currentSession = session;
        this.localStorageService.setItem('data', JSON.stringify(session));
    }

    loadSessionData(): Session {
        var sessionStr = this.localStorageService.getItem('data');
        return (sessionStr) ? <Session>JSON.parse(sessionStr) : null;
    }

    getCurrentSession(): Session {
        return this.currentSession;
    }

    removeCurrentSession(): void {
        this.localStorageService.removeItem('data');
        this.currentSession = null;
    }

    setCurrentRoles(roles: any): void {
        this.currentRoles = roles;
        this.localStorageService.setItem('roles', roles);
    }

    getCurrentRoles(): any {
        return this.currentRoles;
    }

    removeCurrentRoles(): void {
        this.localStorageService.removeItem('roles');
        this.currentRoles = null;
    }

    logout(): void {
        this.removeCurrentSession();
        this.removeCurrentRoles();
    }

    getCurrentUser(): string {
        var session: Session = this.getCurrentSession();
        return (session && session.idusuario) ? session.idusuario.toString() : null;
    };
}