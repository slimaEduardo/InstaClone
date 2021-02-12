import { Usuario } from "./usuario.model";

export class Autenticacao{
    public cadastrarUsuario(usuario: Usuario): void{
        console.log('Chegamos ao servico com:', usuario)
    }
}