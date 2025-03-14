import { Component } from '@angular/core';
import { CarouselComponent } from "./components/carousel/carousel.component";
import { RoadDataComponent } from './components/road-data/road-data.component';

@Component({
    selector: 'app-root',
    imports: [
        CarouselComponent,
        RoadDataComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    providers: []
})
export class AppComponent {
    title = 'detect-camera-pr280-ng';


}
