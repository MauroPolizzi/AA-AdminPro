import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { MedicoModel } from 'src/app/models/medico.model';
import { HospitalModel } from 'src/app/models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public buscar(tipo: 'hospital' | 'medico' | 'usuario', query: string){
    
    // http://localhost:3000/api/todo/medico/1
    const url = `${base_url}/todo/${tipo}/${query}`;

    return this.http.get<any[]>(url, { headers: this.authService.headers })
      .pipe(
        map( (resp: any) => { return this.transformarData(tipo, resp.data) }) // Importante hacer el return en el cuerpo de la function 
      );
  }

  // Transformamos la data, pasandola por los operadores pipe y map
  // esto para ir retornando un nuevo obj con su respectivo tipo
  public transformarData(tipo: string, data: any[]): any[]{

    if(tipo.length === 0) return [];

    switch (tipo) {
      case 'hospital':
        return data.map(
         (hospital: HospitalModel) => new HospitalModel(hospital.nombre, hospital.Guid, hospital.img, hospital.ususarioCreador)
        );
    
      case 'medico': 
        return data.map(
          (medic: MedicoModel) => new MedicoModel(medic.nombre, medic.especialidad, medic.Guid, medic.usuarioId, medic.hospitalId, medic.img)
        );
      
      case 'usuario':
        return data.map(
          (user: UsuarioModel) => new UsuarioModel(user.nombre, user.email, user.Guid, '', user.role, user.google, user.img)
        );
      
        default:
        return [];
    }

  }
}
