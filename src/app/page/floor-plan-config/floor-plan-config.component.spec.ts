import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorPlanConfigComponent } from './floor-plan-config.component';

describe('FloorPlanConfigComponent', () => {
  let component: FloorPlanConfigComponent;
  let fixture: ComponentFixture<FloorPlanConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloorPlanConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloorPlanConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
