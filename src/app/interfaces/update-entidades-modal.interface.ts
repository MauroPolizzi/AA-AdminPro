import { IModel } from "../models/Imodel.model";

export interface UpdateEntidadesModal{

    abrirModal(tipo: IModel): void; // Le pasamos el tipo de objeto, usuario, medico, hospital
    cerrarModal(): void;
}