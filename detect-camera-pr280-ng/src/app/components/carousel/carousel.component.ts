import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/product.service';
import { Carousel } from 'primeng/carousel';

@Component({
    selector: 'app-carousel',
    imports: [Carousel],
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.css',
    providers: [ProductService]
})
export class CarouselComponent implements OnInit {
    products: Product[] = [];

    responsiveOptions: any[] = [];

    constructor( private productService: ProductService ) {
    }

    ngOnInit() {
        this.productService.getProductsSmall().then(( products ) => {
            this.products = products;
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
}
