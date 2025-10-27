import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(public http: HttpClient) { }

  getVehicles() {
    return this.http.get('http://localhost:3000/vehicles');
  }

  addVehicles(vehicleInfo: any) {
    return this.http.post('http://localhost:3000/vehicles', vehicleInfo);
  }

  editVehicles(idVehicle: string, vehicleInfo: any) {
    return this.http.patch('http://localhost:3000/vehicles/' + idVehicle, vehicleInfo)
  }

  deleteVehicles(idVehicle: string) {
    return this.http.delete('http://localhost:3000/vehicles/' + idVehicle)
  }
}
