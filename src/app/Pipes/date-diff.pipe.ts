import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appDateDiff',
})
export class DateDiffPipe implements PipeTransform {
  transform(value: { start: Date; end: Date }): unknown {
    const diffMs = Math.abs(value.end.getTime() - value.start.getTime());

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    return (
      (days > 0 ? `${days}day${days > 1 ? 's ' : ' '}` : '') +
      (hours > 0 ? `${hours}hr ` : ' ') +
      `${minutes}min`
    );
  }
}
