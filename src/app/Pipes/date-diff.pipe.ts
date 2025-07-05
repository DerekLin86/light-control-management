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
@Pipe({
  name: 'timeFormater'
})
export class TimeFormater implements PipeTransform {
  transform(totalSeconds: number) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return (
      (hours > 0 ? `${hours}h` : '') +
      (minutes > 0 ? `${minutes}m` : '') +
      (seconds > 0 ? `${seconds}s` : '')
    );
  }
}
