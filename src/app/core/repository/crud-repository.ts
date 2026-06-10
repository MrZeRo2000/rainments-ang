import {CommonEntity} from "../entity/common-entity";
import {iif, Observable, of, Subject, switchMap, tap} from "rxjs";
import {RestDataSource} from "../../data-source/rest-data-source";
import {MessagesService} from "../../messages/messages.service";
import {HttpParams, HttpResponse} from "@angular/common/http";
import {signal} from "@angular/core";
import {ErrorMessage} from "../../messages/message.model";
import {PersistParams} from "./persist-repository";

export enum CrudActionType {
  Insert = 'insert',
  Update = 'update',
  Delete = 'delete',
  Move   = 'move',
}

export enum CrudStatus {
  Success = 'success',
  Error = 'error',
}

export type CrudAction<T extends CommonEntity> =
  | { type: CrudActionType.Insert; payload: Omit<T, 'id'> }
  | { type: CrudActionType.Update; payload: T }
  | { type: CrudActionType.Delete; payload: Pick<T, 'id'> }
  | { type: CrudActionType.Move;   payload: { sourceId: T['id']; targetId: T['id'] } };


export type CrudSuccessResult<T> = { status: CrudStatus.Success; data: T | null };
export type CrudErrorResult<T> = { status: CrudStatus.Error; error: any };

export type CrudResult<T> =
  | CrudSuccessResult<T>
  | CrudErrorResult<T>;

export class CrudRepository<T extends CommonEntity> {
  constructor(
    protected readonly dataSource: RestDataSource,
    protected readonly messagesService: MessagesService,
    protected readonly resourceName: string) { }

  loadingSignal = signal(false)
  private defaultPersistParams: PersistParams;

  private reportErrorMessage(message: string): void {
    const workMessageSource = this.defaultPersistParams && this.defaultPersistParams.messageSource;
    this.messagesService.reportMessage(new ErrorMessage( message, workMessageSource));
  }

  private route(action: CrudAction<T>): Observable<HttpResponse<T>> {
    switch (action.type) {
      case CrudActionType.Insert:
        return this.dataSource.postResponse(this.resourceName, action.payload);
      case CrudActionType.Update:
        return this.dataSource.putResponse(this.resourceName, action.payload.id, action.payload);
      case CrudActionType.Delete:
        return this.dataSource.deleteResponse(this.resourceName, action.payload.id);
      case CrudActionType.Move:
        const httpParams = new HttpParams()
          .append('fromId', action.payload.sourceId.toString(10))
          .append('toId', action.payload.targetId.toString(10));
        return this.dataSource.postResponse(
          this.resourceName + '/operation:move_order',
          {},
          httpParams
        )
    }
  }

  private readonly crudSubject = new Subject<CrudAction<T>>();

  crudAction$: Observable<CrudResult<T>> = this.crudSubject.asObservable().pipe(
    tap(action => {
      this.loadingSignal.set(true)
    }),
    switchMap(action =>
      this.route(action).pipe(
        switchMap(data =>
          iif(
            () => data.ok,
            of({ status: CrudStatus.Success, data: data.body } as CrudSuccessResult<T>),
            of({ status: CrudStatus.Error, error: data.body } as CrudErrorResult<T>).pipe(
              tap(result =>
                this.reportErrorMessage(`Error reading from server: ${result.error}`)
              )
            )
          )
        )
      )
    ),
    tap(() => {
      this.loadingSignal.set(false)
      console.log(`Loading signal set to false: end`)
    })
  );

}
