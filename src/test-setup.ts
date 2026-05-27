// @angular/build:unit-test initializes the TestBed environment with
// errorOnUnknownElements/Properties = true. Karma used the looser default
// (false). The existing smoke specs were written against the loose default,
// so we restore it here. Tests that want strict element checking can opt in
// per-TestBed via `errorOnUnknownElements`/`errorOnUnknownProperties` in
// configureTestingModule.
//
// We also install noop animations so ModalModule.forRoot() and other
// ngx-bootstrap modules that inject AnimationBuilder don't crash under jsdom.
// The builder's `providersFile` is dropped because resetTestEnvironment()
// discards the builder's own provider module.
import { NgModule } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';

@NgModule({ providers: [provideAnimationsAsync('noop')] })
class TestEnvironmentProvidersModule {}

getTestBed().resetTestEnvironment();
getTestBed().initTestEnvironment(
  [BrowserTestingModule, TestEnvironmentProvidersModule],
  platformBrowserTesting(),
  {
    errorOnUnknownElements: false,
    errorOnUnknownProperties: false,
  },
);
