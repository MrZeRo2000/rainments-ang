import { TestBed } from '@angular/core/testing';

import { LoadingModalService } from './loading-modal.service';
import {BsModalService, ModalModule} from 'ngx-bootstrap';

describe('LoadingModalService', () => {
  let service: LoadingModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BsModalService],
      imports: [ModalModule.forRoot()]
    });
    service = TestBed.inject(LoadingModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
