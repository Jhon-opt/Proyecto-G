import { Component, ViewChild, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { AireService, AireData } from '../services/aire.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { interval, Subscription } from 'rxjs';

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
}
