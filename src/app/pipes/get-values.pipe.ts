import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getValues'
})
export class GetValuesPipe implements PipeTransform {

  transform(map: Map<any, string>): any {
    const ret = [];

    map.forEach((val, key) => {
      ret.push({
        key,
        val
      });
    });

    return ret;
  }

}
