import { Injectable } from '@angular/core';
import { ITreeviewItem } from '../lib';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor() {}

   buildObj(){
     const childObj=[];
      const dummy = {
        text: 'Backend',
        value: 912,
        children: [
          { text: 'C#', value: 9121 },
          { text: 'Java', value: 9122 },
          { text: 'Python', value: 9123, checked: false, disabled: true },
        ],
      };

      for (let index = 0; index < 1000; index++) {
        const element = dummy;
        dummy.value = dummy.value+index+1;
        dummy.children.forEach(child=>child.value = child.value+1);
        childObj.push(dummy);
      }

     return childObj;
      
   }
  getBooks(): ITreeviewItem[] {
    const treeData = {
      text: 'IT',
      value: 9,
      children: [
        {
          text: 'Programming',
          value: 91,
          children: [
            {
              text: 'Frontend',
              value: 911,
              children: [
                { text: 'Angular 1', value: 9111 },
                { text: 'Angular 2', value: 9112 },
                { text: 'ReactJS', value: 9113, disabled: true },
              ],
            },
            {
              text: 'Backend',
              value: 912,
              children: [
                { text: 'C#', value: 9121 },
                { text: 'Java', value: 9122 },
                { text: 'Python', value: 9123, checked: false, disabled: true },
              ],
            },
          ],
        },
        {
          text: 'Networking',
          value: 92,
          children: [
            { text: 'Internet', value: 921,children:[] },
            { text: 'Security', value: 922 },
          ],
        },
      ],
    };
    const itCategory = new ITreeviewItem(treeData);
    return [itCategory];
  }
}
