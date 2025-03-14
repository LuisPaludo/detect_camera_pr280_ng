import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
    transform(seconds: number): string {
        if (seconds === null || seconds === undefined || isNaN(seconds)) {
            return '0 minutos e 0 segundos';
        }

        seconds = Math.floor(seconds);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        let result = '';

        if (hours > 0) {
            result += `${hours} ${hours === 1 ? 'hora' : 'horas'}`;

            if (minutes > 0 || remainingSeconds > 0) {
                result += ', ';
            }
        }

        if (minutes > 0) {
            result += `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;

            if (remainingSeconds > 0) {
                result += ' e ';
            }
        }

        if (remainingSeconds > 0 || (hours === 0 && minutes === 0)) {
            result += `${remainingSeconds} ${remainingSeconds === 1 ? 'segundo' : 'segundos'}`;
        }

        return result;
    }
}
