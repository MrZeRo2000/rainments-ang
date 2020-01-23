import {Component, OnInit} from '@angular/core';
import {PaymentObjectRepository} from '../../model/payment-object-repository';
import {PaymentObject} from '../../model/payment-object';
import {EditMode, EditState} from '../../model/edit-state';

@Component({
  selector: 'app-payment-objects-table',
  templateUrl: './payment-objects-table.component.html',
  styleUrls: ['./payment-objects-table.component.css']
})
export class PaymentObjectsTableComponent implements OnInit {
  editState: EditState<PaymentObject>;

  constructor(private repository: PaymentObjectRepository) { }

  ngOnInit() {
    this.repository.loadData();
  }

  getPaymentObjects(): PaymentObject[] {
    return this.repository.getData();
  }

  onAddClick(): void {
    this.editState = new EditState<PaymentObject>(EditMode.EM_CREATE, new PaymentObject());
  }

  onDeleteClick(item: PaymentObject): void {
    alert('OnDelete:' + item.id);
  }

  onEditClick(item: PaymentObject): void {
    alert('OnEdit:' + item.id);
    this.editState = new EditState<PaymentObject>(EditMode.EM_CREATE, item);
  }

  onSubmit(): void {
    alert('on submit:' + this.editState.editItem.name);
  }

  onCancel(): void {
    this.editState = undefined;
  }

}
