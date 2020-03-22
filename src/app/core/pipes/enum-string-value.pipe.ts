import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumStringValue'
})
export class EnumStringValuePipe implements PipeTransform {

  transform(enumStringClass: any): string[] {
    return Object.keys(enumStringClass).map(value => enumStringClass[value]);
  }

}
