import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../Services/search/search.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { MedicoModel } from 'src/app/models/medico.model';
import { HospitalModel } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  
  public hospitales: any[] = [];
  public medicos: any[] = [];
  public usuarios: any[] = [];

  constructor(private activateRoute: ActivatedRoute, private searchService: SearchService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe( ({termino}) => this.busquedaGlobal(termino));
  }

  public busquedaGlobal(termino: string) {
    
    this.searchService.buscarAll(termino)
      .subscribe( (resp: any) => {
        console.log(resp);
        this.hospitales = resp.hospitales;
        this.medicos = resp.medicos;
        this.usuarios = resp.usuarios;
      });
  }

}
