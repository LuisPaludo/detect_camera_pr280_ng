import { Component, OnInit } from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';
import { NgOptimizedImage, NgStyle } from '@angular/common';
import { ProductService } from '../service/product.service';
import { Product } from '../domain/product';
import { RoadTimerComponent } from "./road-timer/road-timer.component";

@Component({
    selector: 'app-main',
    imports: [Carousel, Tag, Button, NgStyle, NgOptimizedImage, RoadTimerComponent],
    providers: [ProductService],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

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
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }

    getSeverity( status: string ) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
        }
        return 'success';
    }

}
