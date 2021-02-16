import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import firebase from 'firebase';
import { Bd } from 'src/app/bd.service';
import { Progresso } from 'src/app/progresso.service';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public email: string
  public imagem: any

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  })

  constructor(private bd: Bd, private progresso: Progresso) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
    })
  }

  public publicar(): void {
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    })
    console.log(this.progresso.status)
    console.log(this.progresso.estado)
  }

  public preparaImagemUpload(event: Event): void{
   this.imagem = (<HTMLInputElement>event.target).files
  }
}
