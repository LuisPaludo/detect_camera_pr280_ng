import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/product.service';
import { Carousel } from 'primeng/carousel';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'app-carousel',
    imports: [Carousel, Tag, Button, NgStyle],
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
                breakpoint: '1400px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '1199px',
                numVisible: 3,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '575px',
                numVisible: 1,
                numScroll: 1
            }
        ]
    }

    getSeverity( status: string ) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'warn';
        }
    }
}
