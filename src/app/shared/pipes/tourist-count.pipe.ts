import { Pipe, PipeTransform } from '@angular/core';
import {IPersonalData} from '../../models/orders';

@Pipe({
  name: 'touristCount'
})
export class TouristCountPipe implements PipeTransform {

  transform(value: IPersonalData[] | null): number {
    return Array.isArray(value) ? value.length : 0;
  }

}
