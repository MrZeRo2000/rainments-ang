import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavTopComponent } from './components/nav-top/nav-top.component';
import {MessageComponent} from './messages/message.component';
import {AlertModule} from 'ngx-bootstrap/alert';
import {AppInfoComponent} from './components/app-info/app-info.component';
import {RepositoryModule} from './repository/repository.module';
import {RestUrlEnv} from './config/configuration';
import {RestDataSource} from './data-source/rest-data-source';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AlertModule.forRoot(),
        RepositoryModule
      ],
      declarations: [
        AppComponent,
        AppInfoComponent,
        NavTopComponent,
        MessageComponent
      ],
      providers: [RestUrlEnv, RestDataSource]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Rainments'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Rainments');
  });

});
