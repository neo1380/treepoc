import { Pipe, PipeTransform } from '@angular/core';
import { isNil } from 'lodash';
import { ITreeviewItem } from '../models/itreeview-item';

@Pipe({
  name: 'ngxTreeview'
})
export class TreeviewPipe implements PipeTransform {
  transform(objects: any[], textField: string): ITreeviewItem[] {
    if (isNil(objects)) {
      return undefined;
    }

    return objects.map(object => new ITreeviewItem({ text: object[textField], value: object }));
  }
}
