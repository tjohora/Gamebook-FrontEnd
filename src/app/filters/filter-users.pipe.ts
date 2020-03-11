import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from '../models/Comment';

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {

  transform(items: any[], searchText2 : string): any[] {
    if(!items) return[];
    if(!searchText2) return items;
    
    searchText2 = searchText2.toLowerCase();
    return items.filter( (c : Comment) => {return c.userName.toLowerCase().includes(searchText2)});
  }

}
