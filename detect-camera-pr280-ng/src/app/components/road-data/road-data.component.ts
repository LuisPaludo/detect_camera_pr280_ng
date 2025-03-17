import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RoadStateService } from '../../service/road-state.service';
import { RoadState } from '../../domain/road-state';
import { NgIf } from '@angular/common';
import { interval, Subscription, switchMap } from 'rxjs';
import { DurationPipe } from '../../pipes/duration-pipe';
import { RoadStatePipe } from '../../pipes/road-state.pipe';
import { RoadStatePastPipe } from '../../pipes/road-state-past.pipe';
import { CarPreviewComponent } from '../car-preview/car-preview.component';

@Component({
    selector: 'app-road-data',
    imports: [
        NgIf,
        DurationPipe,
        RoadStatePipe,
        RoadStatePastPipe,
        CarPreviewComponent
    ],
    templateUrl: './road-data.component.html',
    styleUrl: './road-data.component.css'
})
export class RoadDataComponent implements OnInit, OnDestroy {

    roadData: RoadState | null = null;
    private subscription: Subscription = new Subscription();

    @ViewChild('carPreview') carPreviewComponent!: CarPreviewComponent;

    constructor(
        private roadStateService: RoadStateService,
    ) {
    }

    getRoadData() {
        this.roadStateService.getLatestRoadState().subscribe({
                next: ( value ) => {
                    this.roadData = value;
                    this.carPreviewComponent.simulateRequest();
                },
                error: ( error ) => {
                    console.log(error)
                }
            }
        )
    }

    ngOnInit() {
        this.startPolling();
    }

    startPolling(): void {
        this.subscription = interval(15000)
            .pipe(
                switchMap(() => this.roadStateService.getLatestRoadState())
            )
            .subscribe({
                next: (value) => {
                    this.roadData = value;
                    this.carPreviewComponent.simulateRequest();
                },
                error: (error) => {
                    console.log(error);
                }
            });

        this.getRoadData();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
