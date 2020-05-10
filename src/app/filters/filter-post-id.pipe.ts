import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../models/Post';

@Pipe({
  name: 'filterPostID'
})
export class FilterPostIDPipe implements PipeTransform {

  transform(items: any[], searchPid : number): any[] {
    if(!items) return[];
    if(!searchPid) return items;
  
  return items.filter( (p : Post) => {return p.postId == searchPid});
  }
}
