import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoadStateService } from '../../service/road-state.service';
import { RoadState } from '../../domain/road-state';
import { NgIf } from '@angular/common';
import { interval, Subscription, switchMap } from 'rxjs';
import { DurationPipe } from '../../pipes/duration-pipe';
import { RoadStatePipe } from '../../pipes/road-state.pipe';
import { RoadStatePastPipe } from '../../pipes/road-state-past.pipe';

@Component({
    selector: 'app-road-data',
    imports: [
        NgIf,
        DurationPipe,
        RoadStatePipe,
        RoadStatePastPipe
    ],
    templateUrl: './road-data.component.html',
    styleUrl: './road-data.component.css'
})
export class RoadDataComponent implements OnInit, OnDestroy {

    roadData: RoadState | null = null;
    private subscription: Subscription = new Subscription();

    constructor(
        private roadStateService: RoadStateService,
    ) {
    }

    getRoadData() {
        this.roadStateService.getLatestRoadState().subscribe({
                next: ( value ) => {
                    this.roadData = value;
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
