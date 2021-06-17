import { ITreeviewItem } from './itreeview-item';

describe('ITreeviewItem', () => {
  it('should throw error if ITreeItem param is null of undefined', () => {
    const error = new Error('Item must be defined');
    expect(() => new ITreeviewItem(null)).toThrow(error);
    expect(() => new ITreeviewItem(undefined)).toThrow(error);
  });

  it('should throw error if ITreeItem text is not a string', () => {
    const error = new Error('A text of item must be string object');
    const fakeString: any = 1;
    expect(() => new ITreeviewItem({ text: null, value: 1 })).toThrow(error);
    expect(() => new ITreeviewItem({ text: undefined, value: 1 })).toThrow(error);
    expect(() => new ITreeviewItem({ text: fakeString, value: 1 })).toThrow(error);
  });

  it('should throw error if ITreeviewItem children is assigned an empty array', () => {
    const error = new Error('Children must be not an empty array');
    const iTreeviewItem = new ITreeviewItem({ text: 'Parent', value: 1 });
    expect(() => iTreeviewItem.children = []).toThrow(error);
  });

  it('should allow to create ITreeviewItem with empty children', () => {
    const iTreeviewItem = new ITreeviewItem({ text: 'Parent', value: 1, children: [] });
    expect(iTreeviewItem.children).toBeUndefined();
  });

  describe('checked', () => {
    it('should have value is true by default', () => {
      const iTreeviewItem = new ITreeviewItem({ text: 'Parent', value: 1 });
      expect(iTreeviewItem.checked).toBeTruthy();
    });

    it('should correct checked value when input second param', () => {
      const iTreeviewItem = new ITreeviewItem({
        text: 'Parent',
        value: 1,
        checked: false,
        children: [
          { text: 'Child 1', value: 11, checked: true }
        ]
      }, true);
      expect(iTreeviewItem.checked).toBe(true);
    });

    it('should set checked value correctly when invoke correctChecked', () => {
      const iTreeviewItem = new ITreeviewItem({
        text: 'Parent',
        value: 1,
        checked: false,
        children: [
          { text: 'Child 1', value: 11, checked: true }
        ]
      });
      expect(iTreeviewItem.checked).toBe(true);
      iTreeviewItem.children.push(new ITreeviewItem({
        text: 'Child 2',
        value: 12,
        checked: false
      }));
      iTreeviewItem.correctChecked();
      expect(iTreeviewItem.checked).toBe(undefined);
    });

    it('should not change checked value if item is disabled', () => {
      const iTreeviewItem = new ITreeviewItem({
        text: 'Parent',
        value: 1,
        checked: true,
        disabled: true
      });
      expect(iTreeviewItem.checked).toBe(true);
      iTreeviewItem.checked = false;
      expect(iTreeviewItem.checked).toBe(true);
    });
  });

  describe('setCheckedRecursive', () => {
    it('should apply checked value to children if item is enabled', () => {
      const iTreeviewItem = new ITreeviewItem({
        text: 'Parent',
        value: 1,
        checked: false,
        children: [
          { text: 'Child 1', value: 11, checked: false }
        ]
      });
      expect(iTreeviewItem.children[0].checked).toBe(false);
      iTreeviewItem.setCheckedRecursive(true);
      expect(iTreeviewItem.children[0].checked).toBe(true);
    });

    it('should not apply checked value to children if item is disabled', () => {
      const iTreeviewItem = new ITreeviewItem({
        text: 'Parent',
        value: 1,
        disabled: true,
        children: [
          { text: 'Child 1', value: 11 }
        ]
      });
      expect(iTreeviewItem.children[0].checked).toBe(true);
      iTreeviewItem.setCheckedRecursive(true);
      expect(iTreeviewItem.children[0].checked).toBe(true);
    });
  });

  describe('collapsed', () => {
    it('should set value is false by default', () => {
      const iTreeviewItem = new ITreeviewItem({ text: 'Parent', value: 1 });
      expect(iTreeviewItem.collapsed).toBeFalsy();
    });

    it('should affectly change collapsed value', () => {
      const iTreeviewItem = new ITreeviewItem({ text: 'Parent', value: 1, collapsed: true });
      expect(iTreeviewItem.collapsed).toBeTruthy();
      iTreeviewItem.collapsed = false;
      expect(iTreeviewItem.collapsed).toBeFalsy();
      iTreeviewItem.collapsed = false;
      expect(iTreeviewItem.collapsed).toBeFalsy();
    });
  });

  describe('setCollapsedRecursive', () => {
    it('should apply collapsed value to children', () => {
      const iTreeviewItem = new ITreeviewItem({
        text: 'Parent',
        value: 1,
        collapsed: false,
        children: [
          { text: 'Child 1', value: 11, collapsed: false }
        ]
      });
      expect(iTreeviewItem.children[0].collapsed).toBe(false);
      iTreeviewItem.setCollapsedRecursive(true);
      expect(iTreeviewItem.children[0].collapsed).toBe(true);
    });
  });

  describe('disabled', () => {
    it('should set value is false by default', () => {
      const iTreeviewItem = new ITreeviewItem({ text: 'Parent', value: 1 });
      expect(iTreeviewItem.disabled).toBeFalsy();
    });

    it('should initialize children are disabled if initializing parent is disabled', () => {
      const iTreeviewItem = new ITreeviewItem({
        text: 'Parent',
        value: 1,
        disabled: true,
        children: [
          { text: 'Child', value: 11, disabled: false }
        ]
      });
      expect(iTreeviewItem.children[0].disabled).toBeTruthy();
    });

    it('should change disabled value of children to false if changing disabled of parent to false', () => {
      const iTreeviewItem = new ITreeviewItem({
        text: 'Parent',
        value: 1,
        children: [
          { text: 'Child 1', value: 11 }
        ]
      });
      expect(iTreeviewItem.children[0].disabled).toBe(false);
      iTreeviewItem.disabled = true;
      expect(iTreeviewItem.children[0].disabled).toBe(true);
      iTreeviewItem.disabled = true;
      expect(iTreeviewItem.children[0].disabled).toBe(true);
    });
  });

  describe('children', () => {
    it('should throw error if change value to empty list', () => {
      const iTreeviewItem = new ITreeviewItem({ text: 'Parent', value: 1 });
      const error = new Error('Children must be not an empty array');
      expect(() => iTreeviewItem.children = []).toThrow(error);
    });

    it('should affectly change children value', () => {
      const iTreeviewItem = new ITreeviewItem({ text: 'Parent', value: 1 });
      const children: ITreeviewItem[] = [
        new ITreeviewItem({ text: 'Child 1', value: 11 })
      ];
      expect(iTreeviewItem.children).toBeUndefined();
      iTreeviewItem.children = children;
      expect(iTreeviewItem.children).toBe(children);
      iTreeviewItem.children = children;
      expect(iTreeviewItem.children).toBe(children);
    });

    it('should accept undefined value', () => {
      const iTreeviewItem = new ITreeviewItem({
        text: 'Parent',
        value: 1,
        children: [
          { text: 'Child 1', value: 11 }
        ]
      });
      expect(iTreeviewItem.children).toBeDefined();
      iTreeviewItem.children = undefined;
      expect(iTreeviewItem.children).toBeUndefined();
    });
  });

  describe('getSelection', () => {
    describe('no children', () => {
      it('should return empty list if item is unchecked', () => {
        const parentItem = new ITreeviewItem({ text: 'Parent', value: 1, checked: false });
        const selection = parentItem.getSelection();
        expect(selection.checkedItems).toEqual([]);
        expect(selection.uncheckedItems).toEqual([parentItem]);
      });

      it('should return a list of current item if item is unchecked', () => {
        const parentItem = new ITreeviewItem({ text: 'Parent', value: 1 });
        const selection = parentItem.getSelection();
        expect(selection.checkedItems).toEqual([parentItem]);
        expect(selection.uncheckedItems).toEqual([]);
      });
    });

    describe('has children', () => {
      it('should return list of checked items', () => {
        const parentItem = new ITreeviewItem({ text: 'Parent', value: 1, checked: false });
        const childItem1 = new ITreeviewItem({ text: 'Child 1', value: 11, checked: true });
        const childItem2 = new ITreeviewItem({ text: 'Child 2', value: 12, checked: false });
        const childItem21 = new ITreeviewItem({ text: 'Child 21', value: 121, checked: true });
        const childItem22 = new ITreeviewItem({ text: 'Child 22', value: 122, checked: false });
        childItem2.children = [childItem21, childItem22];
        parentItem.children = [childItem1, childItem2];
        const selection = parentItem.getSelection();
        expect(selection.checkedItems).toEqual([childItem1, childItem21]);
        expect(selection.uncheckedItems).toEqual([childItem22]);
      });
    });
  });
});
