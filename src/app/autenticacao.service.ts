
import firebase from "firebase";
import { Usuario } from "./usuario.model";

export class Autenticacao{
    public cadastrarUsuario(usuario: Usuario): void{
       /*  console.log('Chegamos ao servico com:', usuario) */
        firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
        .then((resposta: any) => {

            //remove a senha do usuario antes de salvar os dados no banco
            delete usuario.senha
            //registrando dados complementares do usuario no path email na base 64
            firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
            .set( usuario )
        })
        .catch((error: Error) => {
            console.log(error)
        })
    }
}