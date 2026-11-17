import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Masdenosotros } from './masdenosotros';

describe('Masdenosotros', () => {
  let component: Masdenosotros;
  let fixture: ComponentFixture<Masdenosotros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Masdenosotros],
    }).compileComponents();

    fixture = TestBed.createComponent(Masdenosotros);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
