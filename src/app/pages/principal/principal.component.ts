import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent  {

  constructor (
    private meta: Meta
  ) {
    this.meta.updateTag({ name: 'title', content: 'Buscador de vuelos.' });
    this.meta.updateTag({ name: 'description', content: 'Buscador de vuelos.' });
  }
}
