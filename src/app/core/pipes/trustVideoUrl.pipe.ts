import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'trustVideoUrl' })
export class TrustVideoUrl implements PipeTransform {
    transform(value: any) {
        return 'assets/schedule_media/' + value;
    }
}