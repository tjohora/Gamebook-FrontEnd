import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from '../models/Comment';

@Pipe({
  name: 'filterCommentID'
})
export class FilterCommentIDPipe implements PipeTransform {

  transform(items: any[], searchCid : number): any[] {
    if(!items) return[];
    if(!searchCid) return items;
  
  return items.filter( (c : Comment) => {return c.commentID == searchCid});
  }

}
