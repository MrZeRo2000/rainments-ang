// @angular/build:unit-test initializes the TestBed environment with
// errorOnUnknownElements/Properties = true. Karma used the looser default
// (false). The existing smoke specs were written against the loose default,
// so we restore it here. Tests that want strict element checking can opt in
// per-TestBed via `errorOnUnknownElements`/`errorOnUnknownProperties` in
// configureTestingModule.
//
// We also install noop animations so ngx-bootstrap modules that inject
// AnimationBuilder don't crash under jsdom. The builder's `providersFile` is
// dropped because resetTestEnvironment() discards the builder's own provider
// module.
//
// The app runs zoneless and zone.js is no longer installed, so the test
// environment must provide zoneless change detection too (otherwise Angular
// errors with "requires Zone.js"). Specs drive CD manually via
// fixture.detectChanges().
import { NgModule, provideZonelessChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';

@NgModule({ providers: [provideZonelessChangeDetection(), provideAnimationsAsync('noop')] })
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
