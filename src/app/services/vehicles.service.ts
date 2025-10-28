import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url1 } from './url';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(public http: HttpClient) { }

  baseURL = url1;

  getVehicles() {
    return this.http.get(url1 + 'vehicles');
  }

  addVehicles(vehicleInfo: any) {
    return this.http.post(url1 + 'vehicles', vehicleInfo);
  }

  editVehicles(idVehicle: string, vehicleInfo: any) {
    return this.http.patch(url1 + 'vehicles/' + idVehicle, vehicleInfo)
  }

  deleteVehicles(idVehicle: string) {
    return this.http.delete(url1 + 'vehicles/' + idVehicle)
  }
}
