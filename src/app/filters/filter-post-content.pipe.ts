import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../models/Post';

@Pipe({
  name: 'filterPostContent'
})
export class FilterPostContentPipe implements PipeTransform {

  transform(items: any[], searchPcontent : string): any [] {
    if(!items) return[];
    if(!searchPcontent) return items;
    
    searchPcontent = searchPcontent.toLowerCase();
    return items.filter( (p : Post) => {return p.postContent.toLowerCase().includes(searchPcontent)});
  }

}
