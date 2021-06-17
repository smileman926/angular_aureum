import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'limitTo'
})
export class TruncatePipe implements PipeTransform {
    transform(value: string): string {
        // console.log('Truncate pipe calling...', value);
        if (value) {
            const limit = 8;
            const trail = ' ...';
            // console.log('Value length=========++>', value.length);
            return value.length > limit ? value.substring(0, limit) + trail : value;
        } else {
            return value;
        }

    }



    // transform(value: string, args: string): string {
    //     console.log('Truncate pipe calling...',value);
    //     if (value) {
    //         let limit = args ? parseInt(args) : 8;
    //         let trail = ' ...';
    //         console.log('Value length=========++>',value.length);
    //         return value.length > limit ? value.substring(0, limit) + trail : value;
    //     } else {
    //         return value
    //     }

    // }
}