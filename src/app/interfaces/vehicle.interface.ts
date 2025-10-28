import { Color } from "./color.interfaces";
import { Engine } from "./engine.interface";

export interface Vehicle {
    idVehicle: string;
    model: string;
    year: string;
    colorVehicle: Color;
    cost: number;
    engineVehicle: Engine;
    doors: number;
}