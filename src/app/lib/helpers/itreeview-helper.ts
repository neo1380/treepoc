import { concat, isNil, pull } from 'lodash';
import { ITreeviewItem } from '../models/itreeview-item';

export const TreeviewHelper = {
  findItem,
  findItemInList,
  findParent,
  removeItem,
  concatSelection
};

function findItem(root: ITreeviewItem, value: any): ITreeviewItem {
  if (isNil(root)) {
    return undefined;
  }

  if (root.value === value) {
    return root;
  }

  if (root.children) {
    for (const child of root.children) {
      const foundItem = findItem(child, value);
      if (foundItem) {
        return foundItem;
      }
    }
  }

  return undefined;
}

function findItemInList(list: ITreeviewItem[], value: any): ITreeviewItem {
  if (isNil(list)) {
    return undefined;
  }

  for (const item of list) {
    const foundItem = findItem(item, value);
    if (foundItem) {
      return foundItem;
    }
  }

  return undefined;
}

function findParent(root: ITreeviewItem, item: ITreeviewItem): ITreeviewItem {
  if (isNil(root) || isNil(root.children)) {
    return undefined;
  }

  for (const child of root.children) {
    if (child === item) {
      return root;
    } else {
      const parent = findParent(child, item);
      if (parent) {
        return parent;
      }
    }
  }

  return undefined;
}

function removeItem(root: ITreeviewItem, item: ITreeviewItem): boolean {
  const parent = findParent(root, item);
  if (parent) {
    pull(parent.children, item);
    if (parent.children.length === 0) {
      parent.children = undefined;
    } else {
      parent.correctChecked();
    }
    return true;
  }

  return false;
}

function concatSelection(items: ITreeviewItem[], checked: ITreeviewItem[], unchecked: ITreeviewItem[]): { [k: string]: ITreeviewItem[] } {
  let checkedItems = [...checked];
  let uncheckedItems = [...unchecked];
  for (const item of items) {
    const selection = item.getSelection();
    checkedItems = concat(checkedItems, selection.checkedItems);
    uncheckedItems = concat(uncheckedItems, selection.uncheckedItems);
  }
  return {
    checked: checkedItems,
    unchecked: uncheckedItems
  };
}
