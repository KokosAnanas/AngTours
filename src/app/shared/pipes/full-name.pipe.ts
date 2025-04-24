import { Pipe, PipeTransform } from '@angular/core';
import {IPersonalData} from '../../models/orders';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: IPersonalData[] | null): string {
    if (!Array.isArray(value) || !value.length) return '';
    const {firstName, lastName} = value[0];
    return `${firstName} ${lastName}`;
  }
}
