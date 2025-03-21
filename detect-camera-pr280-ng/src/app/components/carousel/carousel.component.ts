import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Carousel } from 'primeng/carousel';
import { Partner } from '../../domain/partner';
import { ModalPartnerComponent } from '../modal-partner/modal-partner.component';

@Component({
    selector: 'app-carousel',
    imports: [Carousel, ModalPartnerComponent],
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.css',
    providers: [ProductService]
})
export class CarouselComponent implements OnInit {
    @Input() showIndicators = true;

    partners: Partner[] = [];
    selectedPartner: Partner | null = null;
    displayModal: boolean = false;

    responsiveOptions: any[] = [];

    constructor( private productService: ProductService ) {
    }

    ngOnInit() {
        this.productService.getProductsSmall().then(
            ( partners ) => {
            this.partners = partners;
        });

        this.responsiveOptions = [
            {
                breakpoint: '2000px',
                numVisible: 10,
                numScroll: 1
            },
            {
                breakpoint: '1400px',
                numVisible: 6,
                numScroll: 1
            },
            {
                breakpoint: '1199px',
                numVisible: 4,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 4,
                numScroll: 1
            },
            {
                breakpoint: '575px',
                numVisible: 2,
                numScroll: 1
            }
        ]
    }

    openPartnerModal(product: Partner) {
        this.selectedPartner = product;
        this.displayModal = true;
    }

}
