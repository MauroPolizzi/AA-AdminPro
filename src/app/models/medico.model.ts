import { environment } from "src/environments/environment";
import { IModel } from "./Imodel.model";
import { HospitalModel } from "./hospital.model";

const base_url = environment.base_url;

export class MedicoModel implements IModel{

    constructor(
        public nombre: string,
        public especialidad: string,
        public Guid?: string,
        public usuarioId?: string,
        public hospitalId?: HospitalModel,
        public img?: string,
        public entityType?: string
    ) {}
}
