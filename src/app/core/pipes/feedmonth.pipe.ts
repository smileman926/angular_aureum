import { Pipe, PipeTransform } from "@angular/core";
import * as moment from 'moment-timezone';
@Pipe({ name: 'tzFeedMonth' })
export class FeedMonthPipe implements PipeTransform {

    transform(value: any, formate: any) {
        if (value) {
            let feedDate = moment(value);
            let finalDate = feedDate.tz(formate).format('MMM Do');
            return finalDate;
        } else {
            return value;
        }
    }
}