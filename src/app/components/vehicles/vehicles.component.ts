import { Component, OnInit } from '@angular/core';
import { VehiclesService } from '../../services/vehicles.service';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { ColorsService } from '../../services/colors.service';
import { EnginesService } from '../../services/engines.service';
import { Vehicle } from '../../interfaces/vehicle.interface';
import { Color } from '../../interfaces/color.interfaces';
import { Engine } from '../../interfaces/engine.interface';
import generatePDF from '../../utils/pdf';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent implements OnInit {

  constructor(private vehiclesService: VehiclesService, private colorsService: ColorsService, private enginesService: EnginesService) { }

  vehicles: Vehicle[] = [];
  vehiclesFiltered: Vehicle[] = [];
  idVehicle: string = '';

  colors: Color[] = [];

  engines: Engine[] = [];
  idEngine: string = ''

  vehicleForm = new FormGroup({
    model: new FormControl('', Validators.required),
    year: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    color: new FormControl('', Validators.required),
    cost: new FormControl('', Validators.required),
    engine: new FormControl('', Validators.required),
    doors: new FormControl('', Validators.required)
  })

  colorForm = new FormGroup({
    name: new FormControl('', Validators.required),
    hexCode: new FormControl('#000000', Validators.required)
  })

  engineForm = new FormGroup({
    engineType: new FormControl('', Validators.required)
  })

  isVisibleAddVehicleModal: boolean = false;
  isVisibleEditVehicleModal: boolean = false;
  isVehiclesFormIncomplete: boolean = false;

  isVisibleColorsModal: boolean = false;
  isColorFormIncomplete: boolean = false;

  isVisibleEnginesModal: boolean = false;
  editEngineActive: boolean = false;
  isEngineFormIncomplete: boolean = false;

  selectedColorId: string = '';
  selectedEngineId: string = '';

  ngOnInit(): void {

    this.getVehicles();
    this.getColors();
    this.getEngines();
  }

  showVehicleModal() {
    this.isVisibleAddVehicleModal = true;
    this.isVehiclesFormIncomplete = false;
    this.vehicleForm.reset();
  }

  closeVehicleModal() {
    this.isVisibleAddVehicleModal = false;
    this.selectedColorId = '';
    this.selectedEngineId = '';
  }

  showColorsModal() {
    this.isVisibleColorsModal = true;
    this.isColorFormIncomplete = false;
  }

  closeColorsModal() {
    this.isVisibleColorsModal = false
  }

  showEnginesModal() {
    this.isVisibleEnginesModal = true
    this.isEngineFormIncomplete = false;
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
        this.vehiclesFiltered = res.data;
      },
      error: err => {
        console.log(err)
      }
    })
  }

  addVehicle() {

    if (!this.vehicleForm.valid) {
      console.log("Favor de llenar todos los campos");
      this.isVehiclesFormIncomplete = true
    }
    else {
      this.vehiclesService.addVehicles(this.vehicleForm.value).subscribe({
        next: (res: any) => {
          console.log(res)
          this.getVehicles();
          this.vehicleForm.reset();
          this.selectedColorId = '';
          this.selectedEngineId = '';
          this.isVisibleAddVehicleModal = false;
        },
        error: err => {
          console.log(err)
        }
      })
    }
  }

  editVehicle() {

    if (!this.vehicleForm.valid) {
      console.log("Favor de llenar todos los campos");
      this.isVehiclesFormIncomplete = true
    }
    else {
      this.vehiclesService.editVehicles(this.idVehicle, this.vehicleForm.value).subscribe({
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

    if (!this.colorForm.valid) {
      this.isColorFormIncomplete = true
    }
    else {
      this.colorsService.addColor(this.colorForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this.getColors();
          this.colorForm.reset();
          this.isColorFormIncomplete = false
        },
        error: err => {
          console.log(err)
        }
      })
    }

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

    if (!this.engineForm.valid) {
      this.isEngineFormIncomplete = true;
    }
    else {
      this.enginesService.addEngine(this.engineForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this.getEngines();
          this.engineForm.reset()
          this.isEngineFormIncomplete = false;
        },
        error: err => {
          console.log(err)
        }
      })
    }
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

  generatePDF() {
    generatePDF(this.vehicles, new Date().getTime(), new Date().toLocaleDateString())
  }

  selectedInput: string = ''

  searchModel: string = '';
  searchYear: string = '';
  searchColor: string = '';
  searchDoors: string = '';

  searchFilter(searchString: string) {

    this.selectedInput = searchString.toString().toLowerCase();

    this.vehiclesFiltered = this.vehicles.filter((vehicleData) => {
      return (
        vehicleData.model + ' ' +
        vehicleData.year + ' ' +
        vehicleData.colorVehicle.name + ' ' +
        vehicleData.doors + ' '
      )
        .toLowerCase()
        .includes(this.selectedInput);
    });
  }

  minCost: number = 0;
  maxCost: number = 0;

  searchRangeCostFilter(min: number, max: number) {

    console.log(min)

    this.vehiclesFiltered = this.vehicles.filter((vehicleData) => {
      return (
        vehicleData.cost >= min || vehicleData.cost <= max
      )
    })
  }

}
