import { ITreeviewItem } from './itreeview-item';
import { ITreeviewConfig } from './itreeview-config';

export interface TreeviewHeaderTemplateContext {
  config: ITreeviewConfig;
  item: ITreeviewItem;
  onCollapseExpand: () => void;
  onCheckedChange: (checked: boolean) => void;
  onFilterTextChange: (text: string) => void;
}
