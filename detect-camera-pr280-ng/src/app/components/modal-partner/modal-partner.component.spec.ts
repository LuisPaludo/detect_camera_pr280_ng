import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPartnerComponent } from './modal-partner.component';

describe('ModalPartnerComponent', () => {
  let component: ModalPartnerComponent;
  let fixture: ComponentFixture<ModalPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPartnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
