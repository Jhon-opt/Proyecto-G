import { Component, ViewChild, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { AireService, AireData } from '../services/aire.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-graficas-sensores',
  standalone: true,
  imports: [BaseChartDirective,CommonModule],
  templateUrl: './graficas-sensores.component.html',
  styleUrls: ['./graficas-sensores.component.css'],
})
export class GraficasSensoresComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  calidadAire: number | null = null;
  categoria: string = '';
  consejo: string = '';
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
              text: 'Fecha de lectura (YYYY-MM-DD)',
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
        plugins: {
          legend: { labels: { color: '#FFFFFF' } }
        }
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
              text: 'Fecha de lectura (YYYY-MM-DD)',
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
        plugins: {
          legend: { labels: { color: '#FFFFFF' } }
        }
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
              text: 'Fecha de lectura (YYYY-MM-DD)',
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
        plugins: {
          legend: { labels: { color: '#FFFFFF' } }
        }
      }
    }
  };

  public chartType: ChartType = 'line';

  constructor(private aireService: AireService) {}

  ngOnInit(): void {
    this.loadAireData();
    this.loadCalidadAire();
  }

  loadAireData(): void {
    this.aireService.getAireData().subscribe({
      next: (data: AireData[]) => {
        const labels = data.map(d =>
          d.fecha_lectura ? d.fecha_lectura.substring(0, 10) : `ID ${d.id}`
        );

        // Actualizar datos para todas las gráficas
        this.charts.co.data.labels = labels;
        this.charts.temp.data.labels = labels;
        this.charts.pm25.data.labels = labels;

        this.charts.co.data.datasets[0].data = data.map(d => d.co_ppm);
        this.charts.temp.data.datasets[0].data = data.map(d => d.temp);
        this.charts.pm25.data.datasets[0].data = data.map(d => d.pm25);

        this.chart?.update();
      },
      error: (err) => {
        console.error('Error al cargar datos:', err);
      }
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
}
