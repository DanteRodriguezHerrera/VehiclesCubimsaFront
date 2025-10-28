import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { variable64 } from "../../assets/logo";
import { Vehicle } from "../interfaces/vehicle.interface";

// ✅ Conectar las fuentes al pdfMake principal
(pdfMake as any).vfs = pdfFonts.vfs;

const generatePDF = (
    vehicles: Vehicle[],
    reciboNo: number,
    fecha: string
) => {

    const tableBody = [
        [
            { text: "Modelo", style: "tableHeader" },
            { text: "Año", style: "tableHeader" },
            { text: "Color", style: "tableHeader" },
            { text: "Costo", style: "tableHeader" },
            { text: "Motor", style: "tableHeader" },
            { text: "Puertas", style: "tableHeader" },
        ],
        ...vehicles.map((vehicle) => [
            vehicle.model,
            vehicle.year,
            vehicle.colorVehicle.name,
            `$ ${vehicle.cost}`,
            vehicle.engineVehicle.engineType,
            vehicle.doors
        ]),
    ];

    const content: any[] = [];

    content.push({
        columns: [
            { image: variable64.miVar, width: 100 },
            {
                stack: [
                    { text: `Reporte No. ${reciboNo}`, style: "header" },
                    { text: `Fecha: ${fecha}`, style: "subheader" },
                ],
                alignment: "right",
            },
        ],
    });

    content.push({ text: "\n" });

    content.push({
        table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*", "*", "*"],
            body: tableBody,
        },
        layout: "lightHorizontalLines",
        margin: [0, 10, 0, 10],
    });

    const styles = {
        header: {
            fontSize: 14,
            bold: true,
        },
        subheader: {
            fontSize: 12,
            margin: [0, 5, 0, 5],
        },
        tableHeader: {
            bold: true,
            fontSize: 12,
            color: "black",
        },
        total: {
            fontSize: 12,
            bold: true,
        },
    };

    const docDefinition: any = {
        content,
        styles,
    };

    pdfMake.createPdf(docDefinition).open();
};

export default generatePDF;