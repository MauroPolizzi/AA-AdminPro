import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AuthService } from '../../auth/auth.service';
import { map } from 'rxjs';
import { MedicoModel } from 'src/app/models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  // Creamos esta propiedad para capturar y definir los valores del medico que pasemos por parametro al abrir el modal
  public medicoUpdate: MedicoModel = new MedicoModel('','','','','','','');

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getMedicos(pagina: number){
    
    return this.http.get(`${base_url}/medico?pagina=${pagina}`, { headers: this.authService.headers })
      .pipe(
        map( (resp: any) => {
          const medicos = resp.medicoCollection.map(
            (medic: MedicoModel) => 
              new MedicoModel(medic.nombre, medic.especialidad, medic.Guid, medic.usuarioId, medic.hospitalId, medic.img)
          );

          return {
            total: resp.total,
            medicoCollection: medicos
          }
        })
      );
  }

  public actualizarMedico(medico: MedicoModel){
    
    return this.http.put<MedicoModel>(`${base_url}/medico/${medico.Guid}`, medico, { headers: this.authService.headers});
  }

  public eliminarMedico(medico: MedicoModel){

    return this.http.delete(`${base_url}/medico/${medico.Guid}`, { headers: this.authService.headers });
  }
}
