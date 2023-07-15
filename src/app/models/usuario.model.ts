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
}