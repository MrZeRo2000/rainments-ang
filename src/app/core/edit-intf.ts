import {EditState} from '../model/edit-state';

export interface Editable {
  getEditingState(): boolean;
  getEditState(): EditState<any>;
}

export interface Loadable {
  getLoading(): boolean;
}
