import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnginesService {

  constructor(public http: HttpClient) { }

  getEngines() {
    return this.http.get('http://localhost:3000/engines');
  }

  addEngine(engineInfo: any) {
    return this.http.post('http://localhost:3000/engines', engineInfo)
  }

  editEngine(idEngine: string, engineInfo: any) {
    return this.http.patch('http://localhost:3000/engines/' + idEngine, engineInfo)
  }

  deleteEngine(idEngine: string) {
    return this.http.delete('http://localhost:3000/engines/' + idEngine)
  }

}
