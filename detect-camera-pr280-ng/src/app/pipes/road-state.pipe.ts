import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roadState'
})
export class RoadStatePipe implements PipeTransform {

    transform(value: string): string {
        if (!value) {
            return 'Status desconhecido';
        }

        const status = value.toLowerCase().trim();

        switch (status) {
            case 'closed':
                return 'A rodovia está fechada';
            case 'pato_branco':
                return 'O fluxo de veículos está sentido de Pato Branco';
            case 'clevelandia':
                return 'O fluxo de veículos está sentido de Clevelândia';
            default:
                return value;
        }

    }
}
