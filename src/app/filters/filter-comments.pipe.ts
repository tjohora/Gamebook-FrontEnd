import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from '../models/Comment';

@Pipe({
  name: 'filterComments'
})
export class FilterCommentsPipe implements PipeTransform {

  transform(items: any[], searchText : string): any[] {
    if(!items) return[];
    if(!searchText) return items;
    
    searchText = searchText.toLowerCase();
    return items.filter( (c : Comment) => {return c.content.toLowerCase().includes(searchText)});
  }

}
