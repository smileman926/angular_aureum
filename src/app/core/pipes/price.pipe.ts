import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'price' })
export class PricePipe implements PipeTransform {

    transform(price: any, decimal: number) {
        try {
            decimal = decimal || 2;
            if (price) {
                return Number(price).toFixed(decimal).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            } else {
                return price;
            }

        } catch (e) {
        }
    }
}

