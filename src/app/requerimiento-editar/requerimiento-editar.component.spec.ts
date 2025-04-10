import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerimientoEditarComponent } from './requerimiento-editar.component';

describe('RequerimientoEditarComponent', () => {
  let component: RequerimientoEditarComponent;
  let fixture: ComponentFixture<RequerimientoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequerimientoEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequerimientoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
