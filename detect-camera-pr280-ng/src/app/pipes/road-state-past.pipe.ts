import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'roadStatePast'
})
export class RoadStatePastPipe implements PipeTransform {

    transform( value: string ): string {
        if (!value) {
            return 'Status desconhecido';
        }

        const status = value.toLowerCase().trim();

        switch (status) {
            case 'closed':
                return 'A rodovia estava fechada';
            case 'pato_branco':
                return 'O fluxo de veículos estava sentido de Pato Branco';
            case 'clevelandia':
                return 'O fluxo de veículos estava sentido de Clevelândia';
            default:
                return value;
        }
    }

}
