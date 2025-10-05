import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AireService, AireData } from '../services/aire.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-descargar-datos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './descargarDatos.component.html',
})
export class DescargarDatosComponent {
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private aireService: AireService) {}

  downloadExcel(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.aireService.getAireData().subscribe({
      next: (data: AireData[]) => {
        // Formatear los datos para Excel
        const excelData = data.map((item) => ({
          ID: item.id,
          'CO (ppm)': item.co_ppm,
          'Temperatura (°C)': item.temp ?? 'N/A',
          'PM2.5 (µg/m³)': item.pm25 ?? 'N/A',
          'Fecha (Bogotá)': item.fecha_lectura
            ? new Date(item.fecha_lectura).toLocaleTimeString('es-CO', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'UTC'
              })
            : 'N/A',
        }));

        // Crear hoja de cálculo
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos Aire');

        // Establecer anchos de columna
        worksheet['!cols'] = [
          { wch: 5 }, // ID
          { wch: 10 }, // CO (ppm)
          { wch: 15 }, // Temperatura (°C)
          { wch: 15 }, // PM2.5 (µg/m³)
          { wch: 20 }, // Fecha (Bogotá)
        ];

        // Generar archivo Excel
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `datos_aire_${new Date().toISOString().slice(0, 10)}.xlsx`);

        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los datos. Por favor, intenta de nuevo.';
        this.isLoading = false;
        console.error('Error al descargar datos:', err);
      },
    });
  }
}
