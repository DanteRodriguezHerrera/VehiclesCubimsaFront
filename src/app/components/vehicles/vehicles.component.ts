import { Component, OnInit } from '@angular/core';
import { VehiclesService } from '../../services/vehicles.service';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColorsService } from '../../services/colors.service';
import { EnginesService } from '../../services/engines.service';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent implements OnInit {

  constructor(private vehiclesService: VehiclesService, private colorsService: ColorsService, private enginesService: EnginesService) { }

  vehicles: any[] = [];
  idVehicle: string = '';

  colors: any[] = [];

  engines: any[] = [];
  idEngine: string = ''

  vehicleForm = new FormGroup({
    model: new FormControl(''),
    year: new FormControl(),
    color: new FormControl(''),
    cost: new FormControl(),
    engine: new FormControl(''),
    doors: new FormControl('')
  })

  colorForm = new FormGroup({
    name: new FormControl(''),
    hexCode: new FormControl('#000000')
  })

  engineForm = new FormGroup({
    engineType: new FormControl('')
  })

  isVisibleAddVehicleModal: boolean = false;
  isVisibleEditVehicleModal: boolean = false;

  isVisibleColorsModal: boolean = false;

  isVisibleEnginesModal: boolean = false;
  editEngineActive: boolean = false;

  selectedColorId: string = '';
  selectedEngineId: string = '';

  ngOnInit(): void {

    this.getVehicles();
    this.getColors();
    this.getEngines();
  }

  showVehicleModal() {
    this.isVisibleAddVehicleModal = true
  }

  closeVehicleModal() {
    this.isVisibleAddVehicleModal = false
  }

  showColorsModal() {
    this.isVisibleColorsModal = true
  }

  closeColorsModal() {
    this.isVisibleColorsModal = false
  }

  showEnginesModal() {
    this.isVisibleEnginesModal = true
  }

  closeEnginesModal() {
    this.isVisibleEnginesModal = false
  }

  showEditVehicleModal(vehicle: any) {
    this.isVisibleAddVehicleModal = true;
    this.isVisibleEditVehicleModal = true;

    this.selectedColorId = vehicle.colorVehicle.idColor;
    this.selectedEngineId = vehicle.engineVehicle.idEngine;

    this.vehicleForm.patchValue({
      model: vehicle.model,
      year: vehicle.year,
      color: vehicle.colorVehicle.idColor,
      cost: vehicle.cost,
      engine: vehicle.engineVehicle.idEngine,
      doors: vehicle.doors
    })

    this.idVehicle = vehicle.idVehicle;
  }

  showEditEngine(idEngine: string) {
    this.editEngineActive = true;
    this.idEngine = idEngine
  }

  getVehicles() {
    this.vehiclesService.getVehicles().subscribe({
      next: (res: any) => {
        console.log(res.data)
        this.vehicles = res.data;
      },
      error: err => {
        console.log(err)
      }
    })
  }

  addVehicle() {
    this.vehiclesService.addVehicles(this.vehicleForm.value).subscribe({
      next: (res: any) => {
        console.log(res)
        this.getVehicles();
        this.vehicleForm.reset();
        this.isVisibleAddVehicleModal = false;
      },
      error: err => {
        console.log(err)
      }
    })
  }

  editVehicle() {
    this.vehiclesService.editVehicles(this.idVehicle, this.vehicleForm.value).subscribe({
      next: (res: any) => {
        console.log(res)
        this.getVehicles();
        this.vehicleForm.reset()
      },
      error: err => {
        console.log(err)
      }
    })
  }

  deleteVehicle(idVehicle: string) {

    this.vehiclesService.deleteVehicles(idVehicle).subscribe({
      next: (res: any) => {
        console.log(res)
        this.getVehicles();
      },
      error: err => {
        console.log(err)
      }
    })
  }

  getColors() {

    this.colorsService.getColors().subscribe({
      next: (res: any) => {
        console.log(res.data)
        this.colors = res.data;
      },
      error: err => {
        console.log(err)
      }
    })
  }

  addColor() {
    console.log(this.colorForm.value)

    this.colorsService.addColor(this.colorForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getColors();
        this.colorForm.reset();
      },
      error: err => {
        console.log(err)
      }
    })
  }

  deleteColor(idColor: string) {
    this.colorsService.deleteColor(idColor).subscribe({
      next: (res: any) => {
        console.log(res)
        this.getColors();
      },
      error: err => {
        console.log(err)
      }
    })
  }

  getEngines() {
    this.enginesService.getEngines().subscribe({
      next: (res: any) => {
        console.log(res.data)
        this.engines = res.data
      },
      error: err => {
        console.log(err)
      }
    })
  }

  addEngine() {
    this.enginesService.addEngine(this.engineForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getEngines();
        this.engineForm.reset()
      },
      error: err => {
        console.log(err)
      }
    })
  }

  deleteEngine(idEngine: string) {
    this.enginesService.deleteEngine(idEngine).subscribe({
      next: (res: any) => {
        console.log(res)
        this.getEngines();
      },
      error: err => {
        console.log(err)
      }
    })
  }

  selectColor(e: Event) {
    const value = (e.target as HTMLSelectElement).value;
    this.vehicleForm.patchValue({ color: value })
  }

  selectEngine(e: Event) {
    const value = (e.target as HTMLSelectElement).value;
    this.vehicleForm.patchValue({ engine: value })
  }

}
