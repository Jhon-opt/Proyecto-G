import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasSensoresComponent } from './graficas-sensores.component';

describe('GraficasSensoresComponent', () => {
  let component: GraficasSensoresComponent;
  let fixture: ComponentFixture<GraficasSensoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficasSensoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficasSensoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
