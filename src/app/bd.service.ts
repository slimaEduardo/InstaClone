
import { Injectable } from "@angular/core"
import firebase from "firebase"
import { Progresso } from "./progresso.service"

@Injectable()
export class Bd {

    constructor(private progresso: Progresso){}

    public publicar(publicacao: any): void {
       
        let nomeImagem = Date.now()

        firebase.storage().ref()
        .child(`imagens/${nomeImagem}`)
        .put(publicacao.imagem)
        .on(firebase.storage.TaskEvent.STATE_CHANGED,
            /* Evento on() armazena os eventos
        da tarefa de upload pro storage do firebase*/
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
       /*  firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
        .push({titulo: publicacao.titulo}) */
        
    }
}