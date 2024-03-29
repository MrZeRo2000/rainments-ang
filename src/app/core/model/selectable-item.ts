export class SelectableItem<T> {
  constructor(public value: T, public isSelected: boolean) {
  }

  public static getSelectedItemValues<T>(items: Array<SelectableItem<T>>): Array<T> {
    return items?.filter(value => value.isSelected).map(value => value.value);
  }

  public static getSelectedCount<T>(items: Array<SelectableItem<T>>): number {
    return items?.filter(value => value.isSelected)?.length;
  }
}

