import { Component, OnInit, ElementRef, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-car-preview',
    imports: [],
    templateUrl: './car-preview.component.html',
    styleUrl: './car-preview.component.css'
})
export class CarPreviewComponent implements OnInit, OnChanges {
    @ViewChild('car', { static: true }) carRef!: ElementRef<HTMLDivElement>;
    @ViewChild('roadPath', { static: true }) roadPathRef!: ElementRef<SVGPathElement>;
    @ViewChild('destination', { static: true }) destinationRef!: ElementRef<HTMLDivElement>;
    @ViewChild('trees', { static: true }) treesRef!: ElementRef<HTMLDivElement>;

    @Input() progress: number = 0;

    private currentProgress: number = 0;
    private pathLength: number = 0;

    constructor() {
    }

    ngOnInit(): void {
        this.initializeVisualization();

        this.positionCar(0);
    }

    ngOnChanges( changes: SimpleChanges ): void {
        if (changes['progress'] && changes['progress'].currentValue !== changes['progress'].previousValue) {
            const newProgress = Math.min(Math.max(changes['progress'].currentValue, 0), 1);
            this.updateCarPosition(newProgress);
        }
    }

    private initializeVisualization(): void {
        const roadPath = this.roadPathRef.nativeElement;
        this.pathLength = roadPath.getTotalLength();

        const endPoint = roadPath.getPointAtLength(this.pathLength);
        const destination = this.destinationRef.nativeElement;
        destination.style.left = (endPoint.x - 10) + 'px';
        destination.style.top = (endPoint.y - 10) + 'px';

        this.addRandomTrees();
    }

    private addRandomTrees(): void {
        const trees = this.treesRef.nativeElement;

        for (let i = 0; i < 20; i++) {
            const tree = document.createElement('div');
            tree.className = 'tree';
            tree.style.left = Math.random() * 760 + 20 + 'px';
            tree.style.top = Math.random() * 360 + 20 + 'px';
            trees.appendChild(tree);
        }
    }

    private positionCar( progress: number ): void {
        const roadPath = this.roadPathRef.nativeElement;
        const car = this.carRef.nativeElement;
        const destination = this.destinationRef.nativeElement;

        const point = roadPath.getPointAtLength(progress * this.pathLength);

        car.style.left = (point.x - 20) + 'px';
        car.style.top = (point.y - 10) + 'px';

        if (progress < 0.99) {
            const nextPoint = roadPath.getPointAtLength((progress + 0.01) * this.pathLength);
            const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180 / Math.PI;
            car.style.transform = `rotate(${angle}deg)`;
        }

        if (progress >= 1) {
            destination.style.backgroundColor = '#00cc00';
            destination.textContent = '✓';
        } else {
            destination.style.backgroundColor = '#ffcc00';
            destination.textContent = '🏁';
        }
    }

    public updateCarPosition( progress: number ): void {
        this.currentProgress = Math.min(Math.max(progress, 0), 1);
        this.positionCar(this.currentProgress);
    }

    public simulateRequest(): void {
        if (this.currentProgress < 1) {
            this.currentProgress += 0.1;
            if (this.currentProgress > 1) this.currentProgress = 1;

            this.positionCar(this.currentProgress);
        }
    }

    public resetAnimation(): void {
        this.currentProgress = 0;
        this.positionCar(0);
    }
}
