import { Component, OnInit } from '@angular/core';
import { VehiclesService } from '../../services/vehicles.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ColorsService } from '../../services/colors.service';
import { EnginesService } from '../../services/engines.service';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent implements OnInit {

  constructor(private vehiclesService: VehiclesService, private colorsService: ColorsService, private enginesService: EnginesService) { }

  vehicles: any[] = [];

  colors: any[] = [];

  engines: any[] = [];

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
  isVisibleColorsModal: boolean = false;
  isVisibleEnginesModal: boolean = false;

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
    console.log(this.vehicleForm.value)

    this.vehiclesService.addVehicles(this.vehicleForm.value).subscribe({
      next: (res: any) => {
        console.log(res)
        this.getVehicles();
        this.vehicleForm.reset();
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

}
