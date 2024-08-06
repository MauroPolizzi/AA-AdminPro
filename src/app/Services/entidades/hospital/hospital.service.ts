import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AuthService } from '../../auth/auth.service';
import { map } from 'rxjs';
import { HospitalModel } from 'src/app/models/hospital.model';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getHospital(pagina: number){
    
    return this.http.get(`${base_url}/hospital?pagina=${pagina}`, { headers: this.authService.headers })
      .pipe(
        map( (resp: any) => {
          const hospitales = resp.hospitalCollection.map(
            (hospital: HospitalModel) =>
              new HospitalModel(hospital.nombre, hospital.Guid, hospital.img, hospital.ususarioCreador)
          );
          
          return {
            total: resp.total,
            hospitalCollection: hospitales
          };
        })
      );
  }

  public eliminarHospital(hospital: HospitalModel){

    return this.http.delete(`${base_url}/hospital/${hospital.Guid}`, { headers: this.authService.headers });
  }
}
