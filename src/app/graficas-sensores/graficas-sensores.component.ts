import { Component, ViewChild, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { AireService, AireData } from '../services/aire.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-graficas-sensores',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, RouterModule],
  templateUrl: './graficas-sensores.component.html',
  styleUrls: ['./graficas-sensores.component.css'],
})
export class GraficasSensoresComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  calidadAire: number | null = null;
  categoria: string = '';
  consejo: string = '';
   isLoading: boolean = false;
  errorMessage: string | null = null;

  // Nueva propiedad para saber qué gráfica mostrar
  selectedChart: 'co' | 'temp' | 'pm25' = 'co';

  private subDatos?: Subscription;
  private subIqa?: Subscription;

  // Configuración para las tres gráficas
  public charts = {
    co: {
      data: {
        labels: [] as string[],
        datasets: [{
          data: [] as number[],
          label: 'CO (ppm)',
          fill: true,
          tension: 0.5,
          borderColor: 'rgba(0,170,0,1)',
          backgroundColor: 'rgba(0,170,0,0.3)',
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Hora de lectura',
              color: '#FFFFFF',
              font: { size: 16, weight: 'bold' }
            },
            ticks: { color: '#FFFFFF' }
          },
          y: {
            title: {
              display: true,
              text: 'Concentración CO (ppm)',
              color: '#FFFFFF',
              font: { size: 16, weight: 'bold' }
            },
            ticks: { color: '#FFFFFF' }
          }
        },
        plugins: { legend: { labels: { color: '#FFFFFF' } } }
      }
    },
    temp: {
      data: {
        labels: [] as string[],
        datasets: [{
          data: [] as (number | null)[],
          label: 'Temperatura (°C)',
          fill: true,
          tension: 0.5,
          borderColor: 'rgba(255,0,0,1)',
          backgroundColor: 'rgba(255,0,0,0.3)',
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Hora de lectura',
              color: '#FFFFFF',
              font: { size: 16, weight: 'bold' }
            },
            ticks: { color: '#FFFFFF' }
          },
          y: {
            title: {
              display: true,
              text: 'Temperatura (°C)',
              color: '#FFFFFF',
              font: { size: 16, weight: 'bold' }
            },
            ticks: { color: '#FFFFFF' }
          }
        },
        plugins: { legend: { labels: { color: '#FFFFFF' } } }
      }
    },
    pm25: {
      data: {
        labels: [] as string[],
        datasets: [{
          data: [] as (number | null)[],
          label: 'PM2.5 (µg/m³)',
          fill: true,
          tension: 0.5,
          borderColor: 'rgba(255,165,0,1)',
          backgroundColor: 'rgba(255,165,0,0.3)',
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Hora de lectura',
              color: '#FFFFFF',
              font: { size: 16, weight: 'bold' }
            },
            ticks: { color: '#FFFFFF' }
          },
          y: {
            title: {
              display: true,
              text: 'PM2.5 (µg/m³)',
              color: '#FFFFFF',
              font: { size: 16, weight: 'bold' }
            },
            ticks: { color: '#FFFFFF' }
          }
        },
        plugins: { legend: { labels: { color: '#FFFFFF' } } }
      }
    }
  };

  public chartType: ChartType = 'line';

  constructor(private aireService: AireService) {}

  ngOnInit(): void {
    // cada 10 segundos consulta de nuevo
    this.subDatos = interval(10000).subscribe(() => this.loadAireData());
    this.subIqa = interval(10000).subscribe(() => this.loadCalidadAire());

    // primera carga inmediata
    this.loadAireData();
    this.loadCalidadAire();
  }

  ngOnDestroy(): void {
    this.subDatos?.unsubscribe();
    this.subIqa?.unsubscribe();
  }

  setChart(type: 'co' | 'temp' | 'pm25') {
    this.selectedChart = type;
    console.log("Gráfica seleccionada:", type);
  }

  loadAireData(): void {
    this.aireService.getAireData().subscribe({
      next: (data: AireData[]) => {
        const labels = data.map(d => {
          if (!d.fecha_lectura) return `ID ${d.id}`;
          return new Date(d.fecha_lectura).toLocaleTimeString('es-CO', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC'
          });
        });

        // Actualizar datos para todas las gráficas
        this.charts.co.data.labels = labels;
        this.charts.temp.data.labels = labels;
        this.charts.pm25.data.labels = labels;

        this.charts.co.data.datasets[0].data = data.map(d => d.co_ppm);
        this.charts.temp.data.datasets[0].data = data.map(d => d.temp);
        this.charts.pm25.data.datasets[0].data = data.map(d => d.pm25);

        this.chart?.update();
      },
      error: (err) => console.error('Error al cargar datos:', err)
    });
  }

  loadCalidadAire(): void {
    this.aireService.getCalidadAire().subscribe({
      next: (data) => {
        this.calidadAire = data.calidad_aire;
        this.categoria = data.recomendacion.categoria;
        this.consejo = data.recomendacion.consejo;
      },
      error: (err) => console.error('Error al cargar calidad del aire:', err)
    });
  }

// Devuelve un color segun la calificación ICA
getColorClass(): string {
  if (this.calidadAire === null) return 'text-gray-400';

  if (this.calidadAire >= 0 && this.calidadAire <= 50) {
    return 'text-green-500'; // Verde
  } else if (this.calidadAire <= 100) {
    return 'text-yellow-500'; // Amarillo
  } else if (this.calidadAire <= 150) {
    return 'text-orange-500'; // Naranja
  } else if (this.calidadAire <= 200) {
    return 'text-red-600'; // Rojo
  } else {
    return 'text-purple-700'; // Morado
  }
}




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
