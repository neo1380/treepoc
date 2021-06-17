import { Component, EventEmitter, Input, Output, ViewChild, TemplateRef } from '@angular/core';
import { TreeviewI18n } from '../../models/itreeview-i18n';
import { ITreeviewItem } from '../../models/itreeview-item';
import { ITreeviewConfig } from '../../models/itreeview-config';
import { TreeviewComponent } from '../itreeview/itreeview.component';
import { TreeviewHeaderTemplateContext } from '../../models/itreeview-header-template-context';
import { TreeviewItemTemplateContext } from '../../models/itreeview-item-template-context';

@Component({
  selector: 'ngx-dropdown-treeview',
  templateUrl: './dropdown-treeview.component.html',
  styleUrls: ['./dropdown-treeview.component.scss']
})
export class DropdownTreeviewComponent {
  @Input() buttonClass = 'btn-outline-secondary';
  @Input() headerTemplate: TemplateRef<TreeviewHeaderTemplateContext>;
  @Input() itemTemplate: TemplateRef<TreeviewItemTemplateContext>;
  @Input() items: ITreeviewItem[];
  @Input() config: ITreeviewConfig;
  @Output() selectedChange = new EventEmitter<any[]>(true);
  @Output() filterChange = new EventEmitter<string>();
  @ViewChild(TreeviewComponent, { static: false }) treeviewComponent: TreeviewComponent;
  buttonLabel: string;

  constructor(
    public i18n: TreeviewI18n,
    private defaultConfig: ITreeviewConfig
  ) {
    this.config = this.defaultConfig;
  }

  onSelectedChange(values: any[]): void {
    this.buttonLabel = this.i18n.getText(this.treeviewComponent.selection);
    this.selectedChange.emit(values);
  }

  onFilterChange(text: string): void {
    this.filterChange.emit(text);
  }
}
