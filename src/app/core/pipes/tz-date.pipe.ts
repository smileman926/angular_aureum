import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'tzDate'
})
export class TzDatePipe implements PipeTransform {

  transform(value: any, formate: any) {
    if (value) {
      let feedDate = moment(value);
      let finalDate = feedDate.tz(formate).format('DD MMM YYYY');
      return finalDate;
    } else {
      return value;
    }
  }

}
