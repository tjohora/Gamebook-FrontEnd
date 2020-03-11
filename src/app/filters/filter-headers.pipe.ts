import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../models/Post';

@Pipe({
  name: 'filterHeaders'
})
export class FilterHeadersPipe implements PipeTransform {

  transform(items: any[], searchText3 : string): any[] {
    if(!items) return[];
    if(!searchText3) return items;
    
    searchText3 = searchText3.toLowerCase();
    return items.filter( (p : Post) => {return p.postHeader.toLowerCase().includes(searchText3)});
  }

}
