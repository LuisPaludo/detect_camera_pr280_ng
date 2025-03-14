import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadDataComponent } from './road-data.component';

describe('RoadDataComponent', () => {
  let component: RoadDataComponent;
  let fixture: ComponentFixture<RoadDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoadDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
