import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'trustVideoUrlaz' })
export class TrustVideoUrlaz implements PipeTransform {
    transform(value: any) {
        return value;
    }
}