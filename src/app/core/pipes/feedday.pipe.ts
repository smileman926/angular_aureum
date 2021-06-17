import { Pipe, PipeTransform } from "@angular/core";
import * as moment from 'moment-timezone';
@Pipe({ name: 'tzFeedDay' })
export class FeedDayPipe implements PipeTransform {
    transform(value: any, formate: any) {
        if (value) {
            let feedDate = moment(value);
            let finalDate = feedDate.tz(formate).format('ddd');
            return finalDate;
        } else {
            return value;
        }
    }
}