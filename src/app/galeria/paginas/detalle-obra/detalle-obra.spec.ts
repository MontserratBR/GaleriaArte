import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleObra } from './detalle-obra';

describe('DetalleObra', () => {
  let component: DetalleObra;
  let fixture: ComponentFixture<DetalleObra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleObra]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleObra);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
