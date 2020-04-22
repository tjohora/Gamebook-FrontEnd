import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from '../models/Comment';
import { user } from '../models/user';

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {

  transform(items: any[], searchText2 : string): any[] {
    if(!items) return[];
    if(!searchText2) return items;
    
    searchText2 = searchText2.toLowerCase();
    return items.filter( (u : user) => {return u.userName.toLowerCase().includes(searchText2)});
  }
}
