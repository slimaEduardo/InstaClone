import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import firebase from 'firebase';
import { Observable, interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  public progressoPublicacao: string = 'pendente'
  public porcentagemUpload: string

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

    let acompanhamentoUpload = interval(500);
    let continua = new Subject<boolean>();
    continua.next (true);

    acompanhamentoUpload.pipe (
      takeUntil (continua)
    ).subscribe (() => {
      console.log (this.progresso.estado);
      console.log (this.progresso.status);
      this.progressoPublicacao = 'andamento'
      let porcentagem: number = (this.progresso.estado.bytesTransferred /  this.progresso.estado.totalBytes) * 100
      this.porcentagemUpload = porcentagem.toFixed()
      console.log(this.progresso.estado.bytesTransferred)
      console.log(this.progresso.estado.totalBytes)
      console.log(this.porcentagemUpload)
      if (this.progresso.status === 'concluido') {
        this.progressoPublicacao = 'concluido'
        continua.next (false);
      }
    });
    
  }

  public preparaImagemUpload(event: Event): void{
   this.imagem = (<HTMLInputElement>event.target).files
  }
}
