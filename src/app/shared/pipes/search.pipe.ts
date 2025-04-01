import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], searchValue: string, prop: string): any[] {
    if (!searchValue) return value;

    if (Array.isArray(value)) {
      const regexp = new RegExp(searchValue, 'i');

      return value.filter((el) => {
        if (el[prop] && typeof el[prop] === 'string') {
          return regexp.test(el[prop]);
        } else {
          console.error(el[prop] + ' is not a string');
          return false;
        }
      });
    } else {
      console.error(value + ' не массив');
      return [];
    }
  }

}
