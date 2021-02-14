
import firebase from "firebase/";
import { Usuario } from "./usuario.model";

export class Autenticacao{

    public token_id: string
   
    public cadastrarUsuario(usuario: Usuario): Promise<any>{
       /*  console.log('Chegamos ao servico com:', usuario) */
       return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
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

    public autenticar(email: string, senha: string): void {
        console.log(email,senha)
       firebase.auth().signInWithEmailAndPassword(email, senha)
       .then((resposta: any) => {
           firebase.auth().currentUser.getIdToken()
           .then((idToken: string)=>{
            this.token_id = idToken
            console.log(this.token_id)
           })
        })
       .catch((error: Error) => console.log(error))
      }
}