import {EditState} from './edit-state';

export interface Editable {
  getEditingState(): boolean;
  getEditState(): EditState<any>;
}

export interface Loadable {
  getLoading(): boolean;
}
