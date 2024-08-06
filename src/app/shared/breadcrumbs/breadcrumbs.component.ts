import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Observable, Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string = '';
  private tituloSubs: Subscription = new Subscription();

  constructor( private router: Router ) { 
    
    this.tituloSubs = this.GetTitlePage()
                          .subscribe( ({ titulo }) => {
                            this.titulo = titulo;
                            document.title = `Admin Pro - ${ titulo }`;
                        } );
  }

  ngOnDestroy(): void {
    this.tituloSubs.unsubscribe();
  }


  public GetTitlePage(): Observable<any>{
    
    return this.router.events
      .pipe(
        filter( (event) => event instanceof ActivationEnd),
        filter( (event) => (event as ActivationEnd).snapshot.firstChild === null ),
        map( (event) => (event as ActivationEnd).snapshot.data )
      );
  }

}
