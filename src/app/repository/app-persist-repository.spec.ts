import { AppPersistRepository } from './app-persist-repository';
import {TestBed} from '@angular/core/testing';
import {MessagesService} from '../messages/messages.service';

describe('AppPersistRepository', () => {
  it('should create an instance', () => {
    expect(new AppPersistRepository(TestBed.inject(MessagesService))).toBeTruthy();
  });
});
