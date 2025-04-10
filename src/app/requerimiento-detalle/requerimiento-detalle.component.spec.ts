import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerimientoDetalleComponent } from './requerimiento-detalle.component';

describe('RequerimientoDetalleComponent', () => {
  let component: RequerimientoDetalleComponent;
  let fixture: ComponentFixture<RequerimientoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequerimientoDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequerimientoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
