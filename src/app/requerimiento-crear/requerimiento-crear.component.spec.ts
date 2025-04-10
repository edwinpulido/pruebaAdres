import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerimientoCrearComponent } from './requerimiento-crear.component';

describe('RequerimientoCrearComponent', () => {
  let component: RequerimientoCrearComponent;
  let fixture: ComponentFixture<RequerimientoCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequerimientoCrearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequerimientoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
