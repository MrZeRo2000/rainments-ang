
export enum EditMode {
  EM_CREATE,
  EM_EDIT
}

export class EditState<T> {
  constructor(public editMode: EditMode, public editItem: T, public submitted: boolean = false) { }
}
