import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url1 } from './url';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  constructor(public http: HttpClient) { }

  baseURL = url1;

  getColors() {
    return this.http.get(url1 + 'colors');
  }

  addColor(colorInfo: any) {
    return this.http.post(url1 + 'colors', colorInfo);
  }

  editColor(idColor: string, colorInfo: any) {
    return this.http.patch(url1 + 'colors/' + idColor, colorInfo)
  }

  deleteColor(idColor: string) {
    return this.http.delete(url1 + 'colors/' + idColor);
  }
}
