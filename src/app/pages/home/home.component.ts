import { Component, AfterViewInit, ElementRef, ViewChild, signal, effect, inject } from '@angular/core';
import { CommonModule, DecimalPipe, JsonPipe } from '@angular/common';
import * as maplibregl from 'maplibre-gl';
import { AireService } from '../../services/aire.service';

interface marker {
  mapboxMarker: maplibregl.Marker;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DecimalPipe, JsonPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  icaService = inject(AireService)
  // Referencia al div del mapa en el HTML
  @ViewChild('map') divElementRef!: ElementRef;

  // Señales reactivas
  marker = signal<marker | null>(null);
  map = signal<maplibregl.Map | null>(null);
  cordinates = signal({ lat: 4.5796, lng: -74.1572 });
  zoom = signal(17);
  icaValue = signal(11);

  // Efecto para sincronizar el zoom con la señal
  zoomEffect = effect(() => {
    if (!this.map()) return;
    this.map()?.setZoom(this.zoom());
  });

  ngAfterViewInit() {
    if (!this.divElementRef?.nativeElement) return;

    const { lat, lng } = this.cordinates();

    const map = new maplibregl.Map({
      container: this.divElementRef.nativeElement,
      zoom: 10,
      center: [lng, lat],
      pitch: 0,
      interactive:false,
      hash: true,
      maxZoom: 18,
      maxPitch: 0,
      style: {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '&copy; OpenStreetMap Contributors',
      maxzoom: 19
    }
  },
  layers: [
    {
      id: 'osm',
      type: 'raster',
      source: 'osm'
    }
  ]
  // ❌ SIN terrain ni hillshade para mantenerlo simple
}
    });

    // ✅ CORREGIDO: Crear el marcador DESPUÉS de map.on('load')
    map.on('load', () => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.innerHTML = `
        <div class="p-2 bg-black rounded-lg shadow-md border border-gray-700 text-center">
          <p class="text-[10px] text-white mb-1">🌱 Calidad del aire según ICA</p>
          <div class="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-black font-bold text-lg mx-auto">
            ${this.icaValue()}
          </div>
        </div>
      `;

      const newMarker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([-74.1572, 4.5796])
        .addTo(map);

      this.marker.set({ mapboxMarker: newMarker });
    });

    this.mapListener(map);
  }

  private mapListener(map: maplibregl.Map) {
    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    });

    map.on('moveend', () => {
      const center = map.getCenter();
      this.cordinates.set(center);
    });

    map.addControl(
      new maplibregl.NavigationControl({
        visualizePitch: true,
        showZoom: false,
        showCompass: false
      })
    );

    // ✅ CORREGIDO: QUITÉ LA LLAMADA RECURSIVA
    // Solo setear el mapa
    this.map.set(map);
  }

  // MÉTODO PARA ACTUALIZAR EL MARCADOR MANUALMENTE
  updateMarker() {
    const currentMap = this.map();
    if (!currentMap) return;

    // Remover marcador anterior
    const currentMarker = this.marker();
    if (currentMarker) {
      currentMarker.mapboxMarker.remove();
      this.marker.set(null);
    }

    // Crear nuevo marcador
    const el = document.createElement('div');
    el.className = 'marker';
    el.innerHTML = `
      <div class="p-2 bg-black rounded-lg shadow-md border border-gray-700 text-center">
        <p class="text-[10px] text-white mb-1">🌱 Calidad del aire según ICA</p>
        <div class="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-black font-bold text-lg mx-auto">
          ${this.icaValue()}
        </div>
      </div>
    `;

    const newMarker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
      .setLngLat([-74.1572, 4.5796])
      .addTo(currentMap);

    this.marker.set({ mapboxMarker: newMarker });
  }

  // MÉTODO PARA CAMBIAR EL VALOR DEL ICA
  changeICA(newValue: number) {
    this.icaValue.set(newValue);
    this.updateMarker();
  }
}
