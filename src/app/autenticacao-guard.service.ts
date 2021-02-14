import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Autenticacao } from "./autenticacao.service";

@Injectable()
export class AutenticacaoGuard implements CanActivate{
    
    constructor(private autenticacao: Autenticacao){}
    
    canActivate(): boolean {
        return this.autenticacao.autenticado()
    }

}