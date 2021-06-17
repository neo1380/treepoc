import { ITreeviewConfig } from './itreeview-config';

describe('ITreeviewConfig', () => {
  it('should have sensible default values', () => {
    const config = new ITreeviewConfig();
    expect(config.hasAllCheckBox).toBe(true);
    expect(config.hasFilter).toBe(false);
    expect(config.hasCollapseExpand).toBe(false);
    expect(config.maxHeight).toBe(500);
    expect(config.decoupleChildFromParent).toBe(false);
  });
});
