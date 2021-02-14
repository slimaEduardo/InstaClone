import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({opacity: 0, transform: 'translate(-50px, 0)'}),
        animate('500ms 0s ease-in-out')
      ])
    ]),
    trigger('animacao-painel',[
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({opacity: 0, transform: 'translate(50px, 0)'})
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {

  public estadoBanner: string = 'criado'
  public estadoPainel: string = 'criado'

  public cadastro: boolean = false
  constructor() { }

  ngOnInit(): void {
  }

  public exibirPainel(event: string): void{
   this.cadastro = event === 'cadastro' ? true : false
   /* console.log(this.cadastro) */
  }

  public inicioDaAnimacao(): void {
    /* console.log('inicio da animacao') */
  }

  public fimDaAnimacao(): void {
   /*  console.log('fim da animacao') */
  }
}
