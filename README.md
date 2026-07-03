# RainmentsAng

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Install
npm install -g @angular/cli

## Start server
ng serve --open

## UI framework
The UI uses **Angular Material** (`@angular/material` + `@angular/cdk`); icons use
the Material Icons font (linked in `index.html`). Bootstrap, ngx-bootstrap, jQuery
and FontAwesome were fully removed (migrated to Material).

## Generate component
ng generate component password

## Generate service
ng generate service PassData

## Deploy
ng build --prod --base-href=/rainments-ang/
copy from dist to webapps directory

## Update angular to latest version
ng update @angular/cli @angular/core

## Run local json server
npm run server           # json-server (fetched via npx) on server/db.json
npm run seed             # reset server/db.json from server/db-original.json
npm run server:data      # seed then run the server

## Run with int configuration
npm run start:int        # ng serve --configuration=int
npm run start:int-ide    # ng serve --configuration=int-ide

## Run one selected test file only
ng test --include=src/app/core/date-range-generator*.ts

## Run one test with browser headless
ng test --include=src/app/utils/*.ts --browsers=ChromeHeadless

## Testing and debugging in IntelliJ
install Karma plugin

## Full update angular to latest version
ng update @angular/cli @angular/core @angular/animations @angular/cdk @angular/common  @angular/compiler @angular/forms @angular/platform-browser @angular/platform-browser-dynamic @angular/router

## Update dev software to latest version
npm install @types/jasmine@latest @types/node@latest codelyzer@latest karma@latest karma-chrome-launcher@latest karma-cli@latest karma-jasmine@latest karma-jasmine-html-reporter@latest jasmine-core@latest jasmine-spec-reporter@latest protractor@latest tslint@latest webpack@latest rxjs-tslint@latest

## Powershell adjustment
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned

## Update from 12 to 13
npx @angular/cli@13 update @angular/core@13 @angular/cli@13 --force

## Install eslint instead of deprecated tspint
ng add @angular-eslint/schematics
ng g @angular-eslint/schematics:convert-tslint-to-eslint

## Upgrade to Angular 16
ng update @angular/core@16 @angular/cli@16 @angular/cdk@16 --allow-dirty --force
