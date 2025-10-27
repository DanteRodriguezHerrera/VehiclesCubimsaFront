import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  constructor(public http: HttpClient) { }

  getColors() {
    return this.http.get('http://localhost:3000/colors');
  }

  addColor(colorInfo: any) {
    return this.http.post('http://localhost:3000/colors', colorInfo);
  }

  editColor(idColor: string, colorInfo: any) {
    return this.http.patch('http://localhost:3000/colors/' + idColor, colorInfo)
  }

  deleteColor(idColor: string) {
    return this.http.delete('http://localhost:3000/colors/' + idColor);
  }
}
