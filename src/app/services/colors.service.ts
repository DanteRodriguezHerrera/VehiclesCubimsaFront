import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url1, url2 } from './url';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  constructor(public http: HttpClient) { }

  getColors() {
    return this.http.get(url2 + 'colors');
  }

  addColor(colorInfo: any) {
    return this.http.post(url2 + 'colors', colorInfo);
  }

  editColor(idColor: string, colorInfo: any) {
    return this.http.patch(url2 + 'colors/' + idColor, colorInfo)
  }

  deleteColor(idColor: string) {
    return this.http.delete(url2 + 'colors/' + idColor);
  }
}
