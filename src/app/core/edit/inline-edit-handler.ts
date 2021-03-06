
export class InlineEditSelection<T> {
  constructor(public selectedItem: T, public controlName: string, public value: string, public active: boolean = true) {
  }
}

export class InlineEditHandler<T> {
  public inlineSelection: InlineEditSelection<T>;

  public inputValidator: (item: T, selection: InlineEditSelection<T>) => boolean;
  public inputProcessor: (item: T, selection: InlineEditSelection<T>) => void;

  public inlineRefOnClick(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  public inlineControlOnClick(event: any): void {
    event.stopPropagation();
  }

  public inlineControlFocusOut(): void {
    this.inlineSelection.active = false;
  }

  public inlineControlKeyUp(event: any, item: T): void {
    if (event.key === 'Escape') {
      this.inlineSelection.active = false;
    } else if (event.key === 'Enter') {
      if (!this.inputValidator || this.inputValidator(item, this.inlineSelection)) {
        if (this.inputProcessor) {
          this.inputProcessor(item, this.inlineSelection);
        }
        this.inlineSelection.active = false;
      }
    }
  }

  public isEditorVisible(item: T, controlName: string): boolean {
    return this.inlineSelection && this.inlineSelection.active &&
      this.inlineSelection.controlName === controlName && this.inlineSelection.selectedItem === item;
  }

}
