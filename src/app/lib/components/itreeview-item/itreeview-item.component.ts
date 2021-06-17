import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { isNil } from 'lodash';
import { ITreeviewItem } from '../../models/itreeview-item';
import { ITreeviewConfig } from '../../models/itreeview-config';
import { TreeviewItemTemplateContext } from '../../models/itreeview-item-template-context';

@Component({
  selector: 'itreeview-item',
  templateUrl: './itreeview-item.component.html',
  styleUrls: ['./itreeview-item.component.scss']
})
export class TreeviewItemComponent {
  @Input() config: ITreeviewConfig;
  @Input() template: TemplateRef<TreeviewItemTemplateContext>;
  @Input() item: ITreeviewItem;
  @Output() checkedChange = new EventEmitter<boolean>();

  constructor(
    private defaultConfig: ITreeviewConfig
  ) {
    this.config = this.defaultConfig;
  }

  onCollapseExpand = () => {
    this.item.collapsed = !this.item.collapsed;
  }

  onCheckedChange = () => {
    const checked = this.item.checked;
    if (!isNil(this.item.children) && !this.config.decoupleChildFromParent) {
      this.item.children.forEach(child => child.setCheckedRecursive(checked));
    }
    this.checkedChange.emit(checked);
  }

  onChildCheckedChange(child: ITreeviewItem, checked: boolean): void {
    if (!this.config.decoupleChildFromParent) {
      let itemChecked: boolean = null;
      for (const childItem of this.item.children) {
        if (itemChecked === null) {
          itemChecked = childItem.checked;
        } else if (itemChecked !== childItem.checked) {
          itemChecked = undefined;
          break;
        }
      }

      if (itemChecked === null) {
        itemChecked = false;
      }

      if (this.item.checked !== itemChecked) {
        this.item.checked = itemChecked;
      }

    }

    this.checkedChange.emit(checked);
  }
}
