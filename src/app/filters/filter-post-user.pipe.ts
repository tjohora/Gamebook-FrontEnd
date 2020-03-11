import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../models/Post';
@Pipe({
  name: 'filterPostUser'
})
export class FilterPostUserPipe implements PipeTransform {

  transform(items: any[], searchText4 : string): any[] {
    if(!items) return[];
    if(!searchText4) return items;
    
    searchText4 = searchText4.toLowerCase();
    return items.filter( (p : Post) => {return p.userName.toLowerCase().includes(searchText4)});
  }

}
