import {ReadRepository} from '../core/repository/read-repository';
import {Payment} from '../model/payment';
import {Injectable} from '@angular/core';
import {RestDataSource} from '../data-source/rest-data-source';
import {MessagesService} from '../messages/messages.service';
import {ReadWriteRepository} from '../core/repository/read-write-repository';
import {HttpParams} from '@angular/common/http';
import {PaymentPersistRepository} from './payment-persist-repository';

@Injectable()
export class PaymentRepository extends ReadWriteRepository<Payment> {
  constructor(
    protected dataSource: RestDataSource,
    protected persistRepository: PaymentPersistRepository,
    protected messagesService: MessagesService
  ) {
    super(dataSource, persistRepository, messagesService, 'payments');
  }

  duplicatePreviousPeriod(paymentObjectId: number, paymentPeriodDate: Date): void {
    const httpParams = new HttpParams()
      .append('paymentObjectId', paymentObjectId.toString(10))
      .append('paymentPeriodDate', paymentPeriodDate.toJSON())
    ;
    this.persistRepository.handlePersistHttpResponse(
      this.dataSource.postResponse('payments:duplicate_previous_period', {}, httpParams)
    );
  }
}
