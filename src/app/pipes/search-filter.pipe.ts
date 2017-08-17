
import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})

@Injectable()
export class SearchFilterPipe implements PipeTransform {

  transform(items: any[], field: String, value: String): any[] {
    let str: any = value;
    var regex = new RegExp(str, 'gi');
    if (!items) return [];

    if (field !== '' && value !== '') {
      return items.filter((item: any) => {
        let f: string = field.toString();
        return item[f].match(regex);
      });
    }
    else {
      return items;
    }

  }
}