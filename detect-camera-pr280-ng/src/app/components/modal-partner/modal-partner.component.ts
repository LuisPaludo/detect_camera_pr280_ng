import { Component, Input, model, ModelSignal } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { NgIf } from '@angular/common';
import { PrimeTemplate } from 'primeng/api';
import { Partner } from '../../domain/partner';

@Component({
    selector: 'app-modal-partner',
    imports: [
        Dialog,
        NgIf,
        PrimeTemplate
    ],
    templateUrl: './modal-partner.component.html',
    styleUrl: './modal-partner.component.css'
})
export class ModalPartnerComponent {
    @Input() selectedPartner: Partner | null = null;
    public displayModal: ModelSignal<boolean> = model(false);

}
