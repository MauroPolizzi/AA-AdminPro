import { environment } from "src/environments/environment";
import { IModel } from "./Imodel.model";

const base_url = environment.base_url;

export class HospitalModel implements IModel{

    constructor(
        public nombre: string,
        public Guid?: string,
        public img?: string,
        public ususarioCreador?: string,
        public entityType?: string
    ) {}
}
