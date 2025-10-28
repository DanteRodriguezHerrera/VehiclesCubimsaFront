import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url1, url2 } from './url';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(public http: HttpClient) { }

  getVehicles() {
    return this.http.get(url2 + 'vehicles');
  }

  addVehicles(vehicleInfo: any) {
    return this.http.post(url2 + 'vehicles', vehicleInfo);
  }

  editVehicles(idVehicle: string, vehicleInfo: any) {
    return this.http.patch(url2 + 'vehicles/' + idVehicle, vehicleInfo)
  }

  deleteVehicles(idVehicle: string) {
    return this.http.delete(url2 + 'vehicles/' + idVehicle)
  }
}
