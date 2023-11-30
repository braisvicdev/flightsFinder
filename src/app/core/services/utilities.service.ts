import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();

    const dayStr = day < 10 ? '0' + day : day;
    const monthStr = day < 10 ? '0' + month : month;

    return `${dayStr}/${monthStr}/${year}`;
  }
}
