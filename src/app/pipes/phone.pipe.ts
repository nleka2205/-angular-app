import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(number: string) {
    number = (+number.charAt(0) != 3 || +number.charAt(0) != 0) ? "" + number : "355" + number;
  
    let newStr = "";
    let i;
  
    for (i = 0 ; i < Math.floor(number.length / 3) - 1; i++) {
      newStr = newStr + number.substring(i * 3, (i + 1)*3) + "-";
    }
  
    return newStr + number.toString().substring(i * 3);
  }

}
