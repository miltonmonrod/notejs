import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportVentaComponent } from './reportventa.component';

describe('ReportVentaComponent', () => {
  let component: ReportVentaComponent;
  let fixture: ComponentFixture<ReportVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
