import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionProyectoComponent } from './informacion-proyecto.component';

describe('InformacionProyectoComponent', () => {
  let component: InformacionProyectoComponent;
  let fixture: ComponentFixture<InformacionProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformacionProyectoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacionProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
