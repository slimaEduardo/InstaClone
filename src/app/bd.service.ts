
import { Injectable } from "@angular/core";
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import { Progresso } from "./progresso.service";

@Injectable()
export class Bd {
    

    constructor(private progresso: Progresso){}

    public publicar(publicacao: any): void {
       
        //let nomeImagem = Date.now()

        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
        .push({titulo: publicacao.titulo})
        .then((resposta: any) => {
            let nomeImagem = resposta.key
            console.log(nomeImagem)
            firebase.storage().ref()
        .child(`imagens/${nomeImagem}`)
        .put(publicacao.imagem)
        .on(firebase.storage.TaskEvent.STATE_CHANGED,
       //Evento on() armazena os eventos
       // da tarefa de upload pro storage do firebase
            (snapshot: any) => {
                //aqui iremos acompanhar o progresso do upload
                this.progresso.status = 'andamento'
                this.progresso.estado = snapshot
                console.log('Snapshot no on()',snapshot)
            },
            (error) => {
                this.progresso.status = 'Erro' 
             //console.log(error)   
            },
            ()=>{
                this.progresso.status = 'concluido'
               // console.log("upload completo")
               
            })
        })
     }

     public consultaPublicacoes(emailUsuario: string): Promise<any> {

       return new Promise((resolve, reject) => {
        firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
        .once('value')
        .then((snapshot: any) => {
            //console.log(snapshot.val())
 
            let publicacoes: Array<any> = [];
 
            snapshot.forEach((childSnapshot: any) => {
 
             let publicacao = childSnapshot.val()
                //consultar a url da imagem
                firebase.storage().ref()
                .child(`imagens/${childSnapshot.key}`)
                .getDownloadURL()
                .then((url: string) => {
                    publicacao.url_imagem = url
                     firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                     .once('value')
                     .then((snapshot: any) => {
                        publicacao.nome_usuario = snapshot.val().nome_usuario
                        publicacoes.push(publicacao)
                     })
                 
                })
            });
 
            resolve(publicacoes)
        })
       })
      
      } 
}