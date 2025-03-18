import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RoadStateService } from '../../service/road-state.service';
import { RoadState } from '../../domain/road-state';
import { DatePipe, NgClass, NgIf } from '@angular/common';
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
        NgClass,
        DatePipe
    ],
    templateUrl: './road-data.component.html',
    styleUrl: './road-data.component.css'
})
export class RoadDataComponent implements OnInit, OnDestroy {

    roadData: RoadState | null = null;
    private subscription: Subscription = new Subscription();
    last_update = new Date();

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
        this.last_update = new Date();
    }

    startPolling(): void {
        this.subscription = interval(15000)
            .pipe(
                switchMap(() => this.roadStateService.getLatestRoadState())
            )
            .subscribe({
                next: (value) => {
                    this.roadData = value;
                    this.last_update = new Date();
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

    getStateColorClass(state: string): string {
        switch (state) {
            case 'closed':
                return 'bg-red-500';
            case 'pato_branco':
                return 'bg-green-500';
            case 'clevelandia':
                return 'bg-yellow-500';
            default:
                return 'bg-blue-400';
        }
    }

    getRoadStateIcon(state: string): string {
        switch (state) {
            case 'closed':
                return 'pi-times-circle';
            case 'pato_branco':
                return 'pi-arrow-down-left';
            case 'clevelandia':
                return 'pi-arrow-up-right';
            default:
                return 'pi-info-circle';
        }
    }

}
