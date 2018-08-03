import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPosVentaComponent } from './reportposventa.component';

describe('ReportPosVentaComponent', () => {
  let component: ReportPosVentaComponent;
  let fixture: ComponentFixture<ReportPosVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPosVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPosVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
