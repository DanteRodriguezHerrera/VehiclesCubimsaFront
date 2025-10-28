import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url1 } from './url';

@Injectable({
  providedIn: 'root'
})
export class EnginesService {

  constructor(public http: HttpClient) { }

  baseURL = url1;

  getEngines() {
    return this.http.get(url1 + 'engines');
  }

  addEngine(engineInfo: any) {
    return this.http.post(url1 + 'engines', engineInfo)
  }

  editEngine(idEngine: string, engineInfo: any) {
    return this.http.patch(url1 + 'engines/' + idEngine, engineInfo)
  }

  deleteEngine(idEngine: string) {
    return this.http.delete(url1 + 'engines/' + idEngine)
  }

}
