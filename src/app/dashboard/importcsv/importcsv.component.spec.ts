import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportcsvComponent } from './importcsv.component';

describe('ImportcsvComponent', () => {
  let component: ImportcsvComponent;
  let fixture: ComponentFixture<ImportcsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportcsvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportcsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
