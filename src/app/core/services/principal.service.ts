import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IMenuItem } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  constructor() { }

  itemsMenu(): Observable <IMenuItem []> {
    return of([]);
  }

}
