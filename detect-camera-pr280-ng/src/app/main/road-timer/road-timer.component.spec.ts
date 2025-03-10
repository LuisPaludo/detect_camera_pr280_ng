import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadTimerComponent } from './road-timer.component';

describe('RoadTimerComponent', () => {
  let component: RoadTimerComponent;
  let fixture: ComponentFixture<RoadTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoadTimerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
