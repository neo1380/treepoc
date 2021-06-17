import { ITreeviewItem } from './itreeview-item';

export interface TreeviewItemTemplateContext {
  item: ITreeviewItem;
  onCollapseExpand: () => void;
  onCheckedChange: () => void;
}
