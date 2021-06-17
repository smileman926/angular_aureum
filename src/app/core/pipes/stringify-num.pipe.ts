import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'stringifyNum'
})
export class StringifyNumPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let special = ['zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    let deca = ['Twent', 'Thirt', 'Fourt', 'Fift', 'Sixt', 'Sevent', 'Eight', 'Ninet', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    return function (n) {
      if (n !== undefined) {
        if (n < 20)
          return special[n];
        if (n % 10 === 0)
          return deca[Math.floor(n / 10) - 2] + 'ieth';
        return deca[Math.floor(n / 10) - 2] + 'y ' + special[n % 10];
      } else {
        return '';
      }
    };
  }
} 