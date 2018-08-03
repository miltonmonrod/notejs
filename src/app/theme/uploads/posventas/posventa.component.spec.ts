import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PosVentaComponent } from './posventa.component';

describe('PosVentaComponent', () => {
  let component: PosVentaComponent;
  let fixture: ComponentFixture<PosVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
