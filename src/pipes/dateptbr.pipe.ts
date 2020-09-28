import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'datePtbr'
})
export class DatePtbrPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): string {
    return super.transform(value, 'dd/MM/yyyy');
  }
}
