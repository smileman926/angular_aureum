import { Pipe, PipeTransform } from "@angular/core";
import * as moment from 'moment-timezone';
@Pipe({ name: 'tzFeedTime' })
export class FeedTimePipe implements PipeTransform {
    transform(value: any, formate: any) {
        if (value) {
            let feedDate = moment(value);
            let finalDate = feedDate.tz(formate).format('hh:mm a');
            return finalDate;
        } else {
            return value;
        }
    }
}