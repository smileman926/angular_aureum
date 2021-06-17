import { Pipe, PipeTransform } from "@angular/core";
import * as moment from 'moment-timezone';
@Pipe({ name: 'tzFeedDetailTime' })
export class FeedTimeDetailPipe implements PipeTransform {
    transform(value: any, formate: any) {
        if (value) {
            let feedDate = moment(value);
            let finalDate = feedDate.tz(formate).format('hh:mm a on dddd, MMM DD YYYY');
            return finalDate;
        } else {
            return value;
        }
    }
}