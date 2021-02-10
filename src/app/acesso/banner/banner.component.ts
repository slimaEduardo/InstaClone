import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Imagem } from './imagem.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('escondido', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1
      })),
      transition('escondido <=> visivel', animate('2s ease-in'))
    ])
  ]
})
export class BannerComponent implements OnInit {

  public estado: string = 'escondido'
  public imagens: Imagem[] = [
   { estado: 'visivel', url: '/assets/banner-acesso/img_1.png' },
   { estado: 'escondido', url: '/assets/banner-acesso/img_2.png' },
   { estado: 'escondido', url: '/assets/banner-acesso/img_3.png' },
   { estado: 'escondido', url: '/assets/banner-acesso/img_4.png' },
   { estado: 'escondido', url: '/assets/banner-acesso/img_5.png' }
  ]
  

  constructor() { }

  ngOnInit(){
    setTimeout(() => this.logicaRotacao(), 3000)
  }

  logicaRotacao(): any {

    let idx: number = 0

   
   //oculta a imagem
   
   for(let i:number = 0; i <= 4; i++){

    if(this.imagens[i].estado === 'visivel'){
      this.imagens[i].estado = 'escondido'
      idx = i === 4 ? 0 : i + 1
      break
    } 
   
  }

   //exibe a imagem
   this.imagens[idx].estado = 'visivel'

   setTimeout(() => this.logicaRotacao(), 3000) 
  }

 public toogleEstadoAnimacao(){
   this.estado = this.estado === 'visivel' ? 'escondido' : 'visivel'
 }

}
