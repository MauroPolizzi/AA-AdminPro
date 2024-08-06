import { environment } from "src/environments/environment";

const base_url = environment.base_url;

export class UsuarioModel{

    constructor(
        public nombre: string,
        public email: string,
        public Guid?: string,
        public password?: string,
        public role?: string,
        public google?: boolean,
        public img?: string
    ) {}

    get getImageUrl() {
        
        if(!this.img) {
            return `${ base_url }/fileupload/usuarios/no-image-jpg`
            // Si nos autenticamos con google
            
        } else if(this.img?.includes('http')) {
            return this.img;

        } else if (this.img) {
            // Si nos autenticamos con email y password
            // /fileupload/usuarios/302522c9-5096-4883-8bf6-757696f0ec89.png
            return `${ base_url }/fileupload/usuarios/${ this.img }`;
        } else {
            return `${ base_url }/fileupload/usuarios/no-image-jpg`
        }
    }
}