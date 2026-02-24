import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, length: number = 3): string {
    return value.split(' ').slice(0, length).join(' ') + '...';
  }

}
