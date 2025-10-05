// src/app/services/aire.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface AireData {
  id: number;
  co_ppm: number;
  temp: number | null;
  pm25: number | null;
  fecha_lectura: string | null;
}

export interface CalidadAire {
  calidad_aire: number;
  recomendacion: {
    categoria: string;
    consejo: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AireService {
  private apiUrl = 'https://apiaire.onrender.com/api/aire/ver';
  private apiUrl2 = 'https://apiaire.onrender.com/api/aire';
  private apiUrlCalendar = 'https://apiaire.onrender.com/api/aire/ver/fecha';

  constructor(private http: HttpClient) {}

  getAireData(): Observable<AireData[]> {
    return this.http.get<{ status: string; data: any[] }>(this.apiUrl).pipe(
      map(response => this.transformData(response.data))
    );
  }

  private transformData(data: any[]): AireData[] {
    return data.map(item => ({
      id: item.id,
      co_ppm: Number(item.co_ppm),
      temp: item.temp ? Number(item.temp) : null,
      pm25: item.pm25 ? Number(item.pm25) : null,
      fecha_lectura: item.fecha_bogota || item.fecha_lectura || null
    }));
  }

 // Cambia la URL de 'nga' a 'iqa'
getCalidadAire(): Observable<CalidadAire> {
  return this.http.get<CalidadAire>(`${this.apiUrl2}/iqa`);
}


getAireDataByDate(fecha: string): Observable<AireData[]> {
  return this.http
    .get<{ status: string; data: any[] }>(
      `${this.apiUrlCalendar}?fecha=${fecha}`
    )
    .pipe(map(response => this.transformData(response.data)));
}


}
