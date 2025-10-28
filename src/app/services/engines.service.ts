import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url1, url2 } from './url';

@Injectable({
  providedIn: 'root'
})
export class EnginesService {

  constructor(public http: HttpClient) { }

  getEngines() {
    return this.http.get(url2 + 'engines');
  }

  addEngine(engineInfo: any) {
    return this.http.post(url2 + 'engines', engineInfo)
  }

  editEngine(idEngine: string, engineInfo: any) {
    return this.http.patch(url2 + 'engines/' + idEngine, engineInfo)
  }

  deleteEngine(idEngine: string) {
    return this.http.delete(url2 + 'engines/' + idEngine)
  }

}
