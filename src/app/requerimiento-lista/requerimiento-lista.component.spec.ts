import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerimientoListaComponent } from './requerimiento-lista.component';

describe('RequerimientoListaComponent', () => {
  let component: RequerimientoListaComponent;
  let fixture: ComponentFixture<RequerimientoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequerimientoListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequerimientoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
